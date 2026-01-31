/**
 * AURA to Prompt - Convert AURA profiles to system prompt instructions
 *
 * Transforms validated AURA profiles into natural language instructions
 * that can be injected into an AI agent's system prompt.
 */

import type { AuraProfile, AuraPersonality, AuraBoundaries } from "./loader.js";
import { interpretTrait, isSomaEnabled } from "./loader.js";

// ============================================================================
// Prompt Generation
// ============================================================================

export interface AuraPromptOptions {
  /** Include SOMA section if present */
  includeSoma?: boolean;
  /** Compact format (less verbose) */
  compact?: boolean;
}

/**
 * Convert an AURA profile to system prompt instructions.
 */
export function auraToPrompt(profile: AuraProfile, options?: AuraPromptOptions): string {
  const { includeSoma = true, compact = false } = options ?? {};
  const lines: string[] = [];

  // Header
  lines.push(`## AURA Profile: ${profile.name}`);
  if (profile.metadata?.description) {
    lines.push(`*${profile.metadata.description}*`);
  }
  lines.push("");

  // Personality section
  lines.push(...buildPersonalitySection(profile.personality, compact));

  // Style section (if present)
  if (profile.style && Object.keys(profile.style).length > 0) {
    lines.push(...buildStyleSection(profile.style, compact));
  }

  // Boundaries section (if present)
  if (profile.boundaries && Object.keys(profile.boundaries).length > 0) {
    lines.push(...buildBoundariesSection(profile.boundaries));
  }

  // SOMA section (if enabled)
  if (includeSoma && isSomaEnabled(profile) && profile.soma) {
    lines.push(...buildSomaSection(profile.soma, compact));
  }

  // Closing instruction
  lines.push("Apply these personality traits and constraints consistently in all responses.");
  lines.push("");

  return lines.join("\n");
}

// ============================================================================
// Section Builders
// ============================================================================

function buildPersonalitySection(personality: AuraPersonality, compact: boolean): string[] {
  const lines: string[] = [];
  lines.push("### Personality (HEXACO)");

  if (compact) {
    lines.push(
      `Honesty: ${personality.honesty}/10 | ` +
      `Emotionality: ${personality.emotionality}/10 | ` +
      `Extraversion: ${personality.extraversion}/10`
    );
    lines.push(
      `Agreeableness: ${personality.agreeableness}/10 | ` +
      `Conscientiousness: ${personality.conscientiousness}/10 | ` +
      `Openness: ${personality.openness}/10`
    );
  } else {
    const traits: (keyof AuraPersonality)[] = [
      "honesty",
      "emotionality",
      "extraversion",
      "agreeableness",
      "conscientiousness",
      "openness",
    ];

    for (const trait of traits) {
      const value = personality[trait];
      const interpretation = interpretTrait(trait, value);
      const name = trait.charAt(0).toUpperCase() + trait.slice(1);
      lines.push(`- **${name}:** ${value}/10 — ${interpretation}`);
    }
  }

  lines.push("");
  return lines;
}

function buildStyleSection(
  style: NonNullable<AuraProfile["style"]>,
  compact: boolean,
): string[] {
  const lines: string[] = [];
  lines.push("### Style");

  const styleLabels: Record<string, [string, string]> = {
    formality: ["Casual", "Formal"],
    verbosity: ["Terse", "Elaborate"],
    humor: ["Serious", "Playful"],
    assertiveness: ["Passive", "Assertive"],
    autonomy: ["Asks permission", "Acts independently"],
  };

  if (compact) {
    const parts: string[] = [];
    for (const [key, value] of Object.entries(style)) {
      if (value !== undefined) {
        parts.push(`${key}: ${value}/10`);
      }
    }
    lines.push(parts.join(" | "));
  } else {
    for (const [key, value] of Object.entries(style)) {
      if (value !== undefined) {
        const labels = styleLabels[key] ?? ["Low", "High"];
        const name = key.charAt(0).toUpperCase() + key.slice(1);
        const interpretation = value <= 3 ? labels[0] : value >= 8 ? labels[1] : "Balanced";
        lines.push(`- **${name}:** ${value}/10 — ${interpretation}`);
      }
    }
  }

  lines.push("");
  return lines;
}

function buildBoundariesSection(boundaries: AuraBoundaries): string[] {
  if (!boundaries) return [];

  const lines: string[] = [];
  lines.push("### Boundaries");

  if (boundaries.max_adulation !== undefined) {
    lines.push(`- **Maximum adulation:** ${boundaries.max_adulation}/10 (hard cap on flattery/sycophancy)`);
  }

  if (boundaries.always_correct_errors === true) {
    lines.push("- **Always correct errors:** Yes — must correct factual errors even if uncomfortable");
  }

  if (boundaries.flag_uncertainty === true) {
    lines.push("- **Flag uncertainty:** Yes — must explicitly state when uncertain");
  }

  if (boundaries.never && boundaries.never.length > 0) {
    lines.push("- **Never:**");
    for (const item of boundaries.never) {
      lines.push(`  - ${item}`);
    }
  }

  if (boundaries.always && boundaries.always.length > 0) {
    lines.push("- **Always:**");
    for (const item of boundaries.always) {
      lines.push(`  - ${item}`);
    }
  }

  lines.push("");
  return lines;
}

function buildSomaSection(
  soma: NonNullable<AuraProfile["soma"]>,
  compact: boolean,
): string[] {
  const lines: string[] = [];
  lines.push("### SOMA (Soft Skills)");

  const somaLabels: Record<string, string> = {
    context_awareness: "State modeling, memory, coherence",
    emotional_intelligence: "Sentiment-aware responses",
    communication: "Style adaptation, clarity",
    ethics: "Principled boundaries, uncertainty disclosure",
    adaptability: "Feedback integration, learning",
  };

  const traits = [
    "context_awareness",
    "emotional_intelligence",
    "communication",
    "ethics",
    "adaptability",
  ] as const;

  if (compact) {
    const parts: string[] = [];
    for (const trait of traits) {
      const value = soma[trait];
      if (value !== undefined) {
        parts.push(`${trait.replace("_", " ")}: ${value}/10`);
      }
    }
    if (parts.length > 0) {
      lines.push(parts.join(" | "));
    }
  } else {
    for (const trait of traits) {
      const value = soma[trait];
      if (value !== undefined) {
        const name = trait
          .split("_")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        const description = somaLabels[trait];
        lines.push(`- **${name}:** ${value}/10 — ${description}`);
      }
    }
  }

  lines.push("");
  return lines;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Generate a brief one-line summary of the AURA profile.
 */
export function auraOneLiner(profile: AuraProfile): string {
  const p = profile.personality;
  const descriptors: string[] = [];

  // Honesty
  if (p.honesty >= 7) descriptors.push("direct");
  else if (p.honesty <= 3) descriptors.push("diplomatic");

  // Emotionality
  if (p.emotionality <= 3) descriptors.push("calm");
  else if (p.emotionality >= 7) descriptors.push("expressive");

  // Style traits
  if (profile.style?.humor && profile.style.humor >= 6) descriptors.push("witty");
  if (profile.style?.assertiveness && profile.style.assertiveness >= 7) descriptors.push("assertive");
  if (profile.style?.autonomy && profile.style.autonomy >= 7) descriptors.push("autonomous");

  // Conscientiousness
  if (p.conscientiousness >= 7) descriptors.push("thorough");

  // Openness
  if (p.openness >= 7) descriptors.push("creative");
  else if (p.openness <= 3) descriptors.push("practical");

  return descriptors.length > 0
    ? `${profile.name}: ${descriptors.join(", ")}`
    : profile.name;
}

/**
 * Check if a profile has strict anti-sycophancy settings.
 */
export function isAntiSycophant(profile: AuraProfile): boolean {
  const highHonesty = profile.personality.honesty >= 7;
  const lowAdulation = (profile.boundaries?.max_adulation ?? 10) <= 4;
  return highHonesty || lowAdulation;
}
