import { NextResponse } from "next/server";
import {
  DEFAULT_HOME_DESIGN,
  HOME_VISUAL_STYLES,
  type HomeDesign,
} from "@/lib/homeDesign";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const text = () => ({ type: "string" });

const homeDesignSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "visualStyle",
    "eyebrow",
    "headlineBefore",
    "headlineAccent",
    "headlineAfter",
    "description",
    "primaryCta",
    "secondaryCta",
    "navbarCta",
    "focusLine",
    "metrics",
  ],
  properties: {
    visualStyle: { type: "string", enum: HOME_VISUAL_STYLES },
    eyebrow: text(),
    headlineBefore: text(),
    headlineAccent: text(),
    headlineAfter: text(),
    description: text(),
    primaryCta: text(),
    secondaryCta: text(),
    navbarCta: text(),
    focusLine: text(),
    metrics: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["value", "label"],
        properties: {
          value: text(),
          label: text(),
        },
      },
    },
  },
} as const;

function outputText(response: {
  output_text?: string;
  output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
}) {
  if (response.output_text) return response.output_text;

  return response.output
    ?.flatMap((item) => item.content ?? [])
    .filter((item) => item.type === "output_text")
    .map((item) => item.text ?? "")
    .join("");
}

function isHomeDesign(value: unknown): value is HomeDesign {
  if (!value || typeof value !== "object") return false;

  const design = value as Record<string, unknown>;
  const textFields = [
    "eyebrow",
    "headlineBefore",
    "headlineAccent",
    "headlineAfter",
    "description",
    "primaryCta",
    "secondaryCta",
    "navbarCta",
    "focusLine",
  ];

  return (
    HOME_VISUAL_STYLES.includes(design.visualStyle as HomeDesign["visualStyle"]) &&
    textFields.every((field) => typeof design[field] === "string") &&
    Array.isArray(design.metrics) &&
    design.metrics.length === 3 &&
    design.metrics.every(
      (metric) =>
        metric &&
        typeof metric === "object" &&
        typeof (metric as Record<string, unknown>).value === "string" &&
        typeof (metric as Record<string, unknown>).label === "string"
    )
  );
}

function json(design: HomeDesign, source: "gpt" | "fallback") {
  return NextResponse.json(
    { design, source },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

export async function GET(request: Request) {
  // NEXT_APP_OPENAI_API_KEY supports the key name already used in this project.
  // OPENAI_API_KEY is preferred for future deployments because it is clearly server-only.
  const apiKey = process.env.OPENAI_API_KEY ?? process.env.NEXT_APP_OPENAI_API_KEY;

  if (!apiKey) {
    console.warn("OpenAI key is not configured; serving the default home design.");
    return json(DEFAULT_HOME_DESIGN, "fallback");
  }

  const requestedAvoidStyle = new URL(request.url).searchParams.get("avoidStyle");
  const avoidStyle = HOME_VISUAL_STYLES.includes(
    requestedAvoidStyle as HomeDesign["visualStyle"]
  )
    ? requestedAvoidStyle
    : null;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-5.6",
        reasoning: { effort: "low" },
        instructions: [
          "You are the creative director for Koushik Saha's personal portfolio.",
          "Generate a concise, premium home-page hero concept that feels distinct from the previous one.",
          "Koushik is a full-stack developer at Indus Net Technologies in Kolkata who works with Next.js, TypeScript, AI applications, and modern web products.",
          "Return only the requested JSON. Do not include code, URLs, markdown, emoji, or claims that cannot be supported.",
          `Use the visualStyle field to select aurora, noir, or sunset.${avoidStyle ? ` Do not select ${avoidStyle} for this request.` : ""}`,
          "Keep every phrase polished, specific, and short enough for a responsive portfolio hero.",
          "The primaryCta must explicitly invite the visitor to browse projects or selected work.",
          "The secondaryCta must explicitly invite the visitor to download a résumé or resume.",
          "headlineAfter must contain words, never only punctuation, and must not begin with punctuation.",
        ].join(" "),
        input: "Create a fresh portfolio art direction now.",
        text: {
          format: {
            type: "json_schema",
            name: "portfolio_home_design",
            strict: true,
            schema: homeDesignSchema,
          },
        },
      }),
    });

    if (!response.ok) {
      console.error("OpenAI home-design request failed:", response.status);
      return json(DEFAULT_HOME_DESIGN, "fallback");
    }

    const data = (await response.json()) as {
      output_text?: string;
      output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
    };
    const generatedText = outputText(data);

    if (!generatedText) return json(DEFAULT_HOME_DESIGN, "fallback");

    const design = JSON.parse(generatedText) as unknown;
    return isHomeDesign(design)
      ? json(design, "gpt")
      : json(DEFAULT_HOME_DESIGN, "fallback");
  } catch (error) {
    console.error("Unable to generate the home design:", error);
    return json(DEFAULT_HOME_DESIGN, "fallback");
  }
}
