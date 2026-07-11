export const HOME_VISUAL_STYLES = ["aurora", "noir", "sunset"] as const;

export type HomeVisualStyle = (typeof HOME_VISUAL_STYLES)[number];

export type HomeMetric = {
  value: string;
  label: string;
};

export type HomeDesign = {
  visualStyle: HomeVisualStyle;
  eyebrow: string;
  headlineBefore: string;
  headlineAccent: string;
  headlineAfter: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  navbarCta: string;
  focusLine: string;
  metrics: [HomeMetric, HomeMetric, HomeMetric];
};

export const DEFAULT_HOME_DESIGN: HomeDesign = {
  visualStyle: "aurora",
  eyebrow: "Full-stack developer · Kolkata, India",
  headlineBefore: "I turn ambitious ideas into",
  headlineAccent: "digital experiences",
  headlineAfter: "that feel inevitable.",
  description:
    "Koushik builds thoughtful web products where sharp engineering meets considered interaction design.",
  primaryCta: "Explore selected work",
  secondaryCta: "Get my résumé",
  navbarCta: "Start a project",
  focusLine: "Design-led systems, engineered for momentum.",
  metrics: [
    { value: "Next.js", label: "core craft" },
    { value: "Full stack", label: "from concept to launch" },
    { value: "AI-ready", label: "built for what’s next" },
  ],
};
