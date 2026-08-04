import { expect, test, type Page } from "@playwright/test";

type DataLayerEvent = Record<string, unknown>;

async function captureDataLayer(page: Page): Promise<DataLayerEvent[]> {
  const events: DataLayerEvent[] = [];
  await page.exposeFunction(
    "__capturePrimaryUcDataLayer",
    (entry: DataLayerEvent) => {
      events.push(entry);
    },
  );
  await page.addInitScript(() => {
    const layer: unknown[] = [];
    const nativePush = Array.prototype.push.bind(layer);
    layer.push = (...entries: unknown[]) => {
      for (const entry of entries) {
        void (
          window as typeof window & {
            __capturePrimaryUcDataLayer: (value: unknown) => Promise<void>;
          }
        ).__capturePrimaryUcDataLayer(entry);
      }
      return nativePush(...entries);
    };
    Object.defineProperty(window, "dataLayer", {
      configurable: true,
      get: () => layer,
      set: (value: unknown) => {
        if (value !== layer && Array.isArray(value)) {
          layer.push(...value);
        }
      },
    });
  });
  return events;
}

test.beforeEach(async ({ page }) => {
  // These behavior tests do not depend on remote analytics or media. Blocking
  // them keeps hydration deterministic on cold local/CI workers.
  await page.route(/^https?:\/\/(?!127\.0\.0\.1:3100(?:\/|$))/, (route) =>
    route.abort(),
  );
});

async function visibleAppointmentForm(page: Page) {
  const form = page
    .locator('[data-testid="book-appointment-form"]:visible')
    .first();
  await expect(form).toHaveAttribute("data-hydrated", "true");
  return form;
}

test("desktop appointment form submits by keyboard and prevents a double click", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name.includes("mobile"),
    "Desktop appointment coverage",
  );
  const dataLayerEvents = await captureDataLayer(page);
  let requests = 0;
  await page.route("**/thank-you", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<h1>Thank you</h1>",
    }),
  );
  await page.route("**/api/forms/submit", async (route) => {
    requests += 1;
    await new Promise((resolve) => setTimeout(resolve, 250));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, redirect: "/thank-you" }),
    });
  });
  await page.goto("/appointment");
  const form = await visibleAppointmentForm(page);
  await form.locator('input[name="firstName"]').fill("Test");
  await form.locator('input[name="lastName"]').fill("Patient");
  await form.locator('input[name="email"]').fill("patient@example.test");
  await form.locator('input[name="phone"]').fill("5613552651");
  await form.locator('input[name="phone"]').press("Enter");
  const submit = form.getByRole("button", { name: /submitting/i });
  await expect(submit).toBeDisabled();
  await submit.click({ force: true });
  await expect(page).toHaveURL(/\/thank-you$/);
  expect(requests).toBe(1);
  await expect
    .poll(() => dataLayerEvents.some((entry) => entry.event === "form_submit"))
    .toBe(true);
  expect(
    dataLayerEvents.some(
      (entry) => entry.event === "enhanced_conversion_form_submit",
    ),
  ).toBe(false);
});

test("accepted attribution and enhanced-conversion PII require marketing consent", async ({
  page,
  context,
}, testInfo) => {
  test.skip(
    testInfo.project.name.includes("mobile"),
    "One consent-gating assertion covers the shared form client",
  );
  const dataLayerEvents = await captureDataLayer(page);
  await context.addCookies([
    {
      name: "primaryuc_cookie_consent_v1",
      value: encodeURIComponent(
        JSON.stringify({
          version: "v1",
          consent: {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true,
          },
          updatedAt: "2026-08-04T00:00:00.000Z",
        }),
      ),
      domain: "127.0.0.1",
      path: "/",
    },
  ]);

  let acceptedBody: Record<string, unknown> | undefined;
  await page.route("**/api/forms/submit", async (route) => {
    acceptedBody = route.request().postDataJSON() as Record<string, unknown>;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, redirect: "/thank-you" }),
    });
  });
  await page.route("**/thank-you", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<h1>Thank you</h1>",
    }),
  );

  await page.goto("/appointment?gclid=test-gclid&utm_source=test-source");
  const form = await visibleAppointmentForm(page);
  await form.locator('input[name="firstName"]').fill("Consent");
  await form.locator('input[name="lastName"]').fill("Patient");
  await form.locator('input[name="email"]').fill("consent@example.test");
  await form.locator('input[name="phone"]').fill("5613552651");
  await form.evaluate((element) =>
    (element as HTMLFormElement).requestSubmit(),
  );

  await expect(page).toHaveURL(/\/thank-you$/);
  expect(acceptedBody?.attribution).toMatchObject({
    gclid: "test-gclid",
    utm_source: "test-source",
  });
  await expect
    .poll(() =>
      dataLayerEvents.some(
        (entry) => entry.event === "enhanced_conversion_form_submit",
      ),
    )
    .toBe(true);
  expect(
    dataLayerEvents.find(
      (entry) => entry.event === "enhanced_conversion_form_submit",
    ),
  ).toMatchObject({
    user_email: "consent@example.test",
    user_phone: "5613552651",
    user_first_name: "Consent",
    user_last_name: "Patient",
  });
});

test("failed verification keeps values and provides an accessible retry error", async ({
  page,
}) => {
  await page.route("**/api/forms/submit", (route) =>
    route.fulfill({
      status: 403,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, message: "Please try again." }),
    }),
  );
  await page.goto("/appointment");
  const form = await visibleAppointmentForm(page);
  await form.locator('input[name="firstName"]').fill("Retry");
  await form.locator('input[name="lastName"]').fill("Patient");
  await form.locator('input[name="email"]').fill("retry@example.test");
  await form.locator('input[name="phone"]').fill("5613552651");
  await form.evaluate((element) =>
    (element as HTMLFormElement).requestSubmit(),
  );
  await expect(form.getByRole("alert")).toContainText(
    "call us at (561) 355-2651",
  );
  await expect(form.locator('input[name="firstName"]')).toHaveValue("Retry");
  await expect(form.getByRole("button", { name: "Submit" })).toBeEnabled();
});

test("dynamic city compact accident form succeeds with optional fields blank", async ({
  page,
}, testInfo) => {
  await page.route("**/api/forms/submit", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, redirect: "/thank-you" }),
    }),
  );
  await page.route("**/thank-you", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<h1>Thank you</h1>",
    }),
  );
  await page.goto("/car-accident/royal-palm-beach");
  let form;
  if (testInfo.project.name.includes("mobile")) {
    await expect(
      page.locator('[data-testid="compact-accident-form"]').first(),
    ).toHaveAttribute("data-hydrated", "true");
    await page
      .getByRole("button", { name: /^request same-day exam/i })
      .press("Enter");
    const dialog = page.getByRole("dialog", {
      name: "Request a Same-Day Accident Exam",
    });
    await expect(dialog).toBeVisible();
    form = dialog.locator('[data-testid="compact-accident-form"]');
  } else {
    form = page
      .locator('[data-testid="compact-accident-form"]:visible')
      .first();
  }
  await expect(form).toHaveAttribute("data-hydrated", "true");
  await form.locator('input[name="fullName"]').fill("Test Patient");
  await form.locator('input[name="phone"]').fill("5613552651");
  await form.locator('input[name="phone"]').press("Enter");
  await expect(page).toHaveURL(/\/thank-you$/);
});

test("homepage mini form opens the full accessible form with all prefills", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByTestId("homepage-hero-mini-form")).toHaveAttribute(
    "data-hydrated",
    "true",
  );
  await page.locator("#hero-first-name").fill("Mini");
  await page.locator("#hero-last-name").fill("Patient");
  await page.locator("#hero-phone").fill("5613552651");
  await page.locator("#hero-accident-type").selectOption("Car Accident");
  await page
    .getByRole("button", { name: "Request Appointment →" })
    .press("Enter");
  const form = page
    .getByRole("dialog")
    .locator('[data-testid="book-appointment-form"]');
  await expect(form.locator('input[name="firstName"]')).toHaveValue("Mini");
  await expect(form.locator('input[name="lastName"]')).toHaveValue("Patient");
  await expect(form.locator('input[name="phone"]')).toHaveValue(
    "(561) 355-2651",
  );
  await expect(form.getByRole("combobox")).toContainText("Car Accident");
  await expect(form.locator('input[name="companyWebsite"]')).toHaveAttribute(
    "tabindex",
    "-1",
  );
});

test("duplicate appointment response does not create analytics or a conversion redirect", async ({
  page,
}) => {
  await page.route("**/api/forms/submit", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, duplicate: true, redirect: null }),
    }),
  );
  await page.goto("/appointment");
  await page.evaluate(() => {
    window.dataLayer = [];
  });
  const form = await visibleAppointmentForm(page);
  await form.locator('input[name="firstName"]').fill("Repeat");
  await form.locator('input[name="lastName"]').fill("Patient");
  await form.locator('input[name="email"]').fill("repeat@example.test");
  await form.locator('input[name="phone"]').fill("5613552651");
  await form.evaluate((element) =>
    (element as HTMLFormElement).requestSubmit(),
  );
  await expect(form.getByRole("status")).toContainText("already received");
  await expect(page).toHaveURL(/\/appointment$/);
  const conversionEvents = await page.evaluate(() =>
    window.dataLayer.filter((entry) =>
      ["form_submit", "enhanced_conversion_form_submit"].includes(entry?.event),
    ),
  );
  expect(conversionEvents).toEqual([]);
});
