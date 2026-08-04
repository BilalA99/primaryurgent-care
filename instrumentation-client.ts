import { initBotId } from "botid/client/core";

const protectedFormRoutes: Parameters<typeof initBotId>[0]["protect"] = [
  {
    path: "/api/forms/submit",
    method: "POST",
    advancedOptions: { checkLevel: "basic" },
  },
  {
    path: "/api/forms/records",
    method: "POST",
    advancedOptions: { checkLevel: "basic" },
  },
];

const e2eClientBypass =
  process.env.NODE_ENV !== "production" &&
  process.env.NEXT_PUBLIC_FORM_E2E_DISABLE_BOTID === "true";

if (!e2eClientBypass) {
  initBotId({
    protect: protectedFormRoutes,
  });
}
