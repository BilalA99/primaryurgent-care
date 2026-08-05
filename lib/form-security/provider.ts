import "server-only";

import { checkBotId } from "botid/server";

import type { FormSecurityConfig } from "./config";

export type ProviderResult =
  | { status: "human"; latencyMs: number }
  | { status: "bot" | "missing_attestation"; latencyMs: number }
  | { status: "failure"; latencyMs: number };

export async function verifyBotAttestation(
  request: Request,
  config: FormSecurityConfig,
  check: typeof checkBotId = checkBotId,
): Promise<ProviderResult> {
  const started = Date.now();
  if (config.isProduction && !request.headers.get("x-is-human")) {
    return { status: "missing_attestation", latencyMs: Date.now() - started };
  }

  try {
    const verification = check({
      advancedOptions: { checkLevel: "basic" },
      developmentOptions: config.developmentBotIdBypass
        ? { bypass: config.developmentBotIdBypass }
        : undefined,
    });
    const result = await new Promise<Awaited<typeof verification>>(
      (resolve, reject) => {
        const timeoutId = setTimeout(
          () => reject(new Error("BotID verification timeout")),
          config.providerTimeoutMs,
        );
        verification.then(
          (value) => {
            clearTimeout(timeoutId);
            resolve(value);
          },
          (error) => {
            clearTimeout(timeoutId);
            reject(error);
          },
        );
      },
    );
    if (
      typeof result.isBot !== "boolean" ||
      typeof result.isHuman !== "boolean" ||
      (!result.isBot && !result.isHuman)
    ) {
      return { status: "failure", latencyMs: Date.now() - started };
    }
    return {
      status: result.isBot || !result.isHuman ? "bot" : "human",
      latencyMs: Date.now() - started,
    };
  } catch {
    return { status: "failure", latencyMs: Date.now() - started };
  }
}
