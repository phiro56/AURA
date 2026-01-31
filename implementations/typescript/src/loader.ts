/**
 * AURA Loader - Load and validate AURA personality profiles
 *
 * AURA (Agent Universal Response Attributes) is a protocol for defining
 * AI agent personality based on the HEXACO psychology model.
 *
 * @see https://github.com/phiro56/AURA
 */

import fs from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

// ============================================================================
// Schema Definitions
// ============================================================================

const TraitSchema = z.number().int().min(1).max(10);

const PersonalitySchema = z
  .object({
    honesty: TraitSchema,
    emotionality: TraitSchema,
    extraversion: TraitSchema,
    agreeableness: TraitSchema,
    conscientiousness: TraitSchema,
    openness: TraitSchema,
  })
  .strict();

const StyleSchema = z
  .object({
    formality: TraitSchema.optional(),
    verbosity: TraitSchema.optional(),
    humor: TraitSchema.optional(),
    assertiveness: TraitSchema.optional(),
    autonomy: TraitSchema.optional(),
  })
  .strict()
  .optional();

const BoundariesSchema = z
  .object({
    max_adulation: TraitSchema.optional(),
    always_correct_errors: z.boolean().optional(),
    flag_uncertainty: z.boolean().optional(),
    never: z.array(z.string()).optional(),
    always: z.array(z.string()).optional(),
  })
  .strict()
  .optional();

const SomaSchema = z
  .object({
    enabled: z.boolean().optional(),
    context_awareness: TraitSchema.optional(),
    emotional_intelligence: TraitSchema.optional(),
    communication: TraitSchema.optional(),
    ethics: TraitSchema.optional(),
    adaptability: TraitSchema.optional(),
  })
  .strict()
  .optional();

const MetadataSchema = z
  .object({
    author: z.string().optional(),
    description: z.string().optional(),
    version: z.string().optional(),
    created: z.string().optional(),
    tags: z.array(z.string()).optional(),
  })
  .passthrough()
  .optional();

export const AuraProfileSchema = z
  .object({
    aura: z.string().regex(/^[0-9]+\.[0-9]+$/),
    name: z.string().min(1).max(100),
    personality: PersonalitySchema,
    style: StyleSchema,
    boundaries: BoundariesSchema,
    soma: SomaSchema,
    metadata: MetadataSchema,
  })
  .strict();

export type AuraProfile = z.infer<typeof AuraProfileSchema>;
export type AuraPersonality = z.infer<typeof PersonalitySchema>;
export type AuraStyle = z.infer<typeof StyleSchema>;
export type AuraBoundaries = z.infer<typeof BoundariesSchema>;
export type AuraSoma = z.infer<typeof SomaSchema>;

// ============================================================================
// Loader Functions
// ============================================================================

export interface AuraLoadResult {
  profile: AuraProfile | null;
  path: string | null;
  error: string | null;
}

/**
 * Search for an AURA profile in a directory.
 *
 * Search order:
 * 1. Explicit path (if provided)
 * 2. {dir}/{agentId}.aura.yaml
 * 3. {dir}/AURA.yaml
 * 4. {dir}/aura.yaml
 */
export async function findAuraProfile(
  dir: string,
  options?: {
    explicitPath?: string;
    agentId?: string;
  },
): Promise<string | null> {
  const { explicitPath, agentId } = options ?? {};

  // 1. Explicit path
  if (explicitPath) {
    const resolved = path.isAbsolute(explicitPath)
      ? explicitPath
      : path.join(dir, explicitPath);
    try {
      await fs.access(resolved);
      return resolved;
    } catch {
      return null;
    }
  }

  // 2. Agent-specific file
  if (agentId) {
    const agentPath = path.join(dir, `${agentId}.aura.yaml`);
    try {
      await fs.access(agentPath);
      return agentPath;
    } catch {
      // Continue to next option
    }
  }

  // 3-4. Default files
  const defaultFiles = ["AURA.yaml", "aura.yaml"];
  for (const file of defaultFiles) {
    const filePath = path.join(dir, file);
    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      // Continue to next option
    }
  }

  return null;
}

/**
 * Load and validate an AURA profile from a file.
 */
export async function loadAuraProfile(filePath: string): Promise<AuraLoadResult> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const parsed = parseYaml(content);

    const result = AuraProfileSchema.safeParse(parsed);
    if (!result.success) {
      const issues = result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
      return {
        profile: null,
        path: filePath,
        error: `AURA validation failed: ${issues}`,
      };
    }

    return {
      profile: result.data,
      path: filePath,
      error: null,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      profile: null,
      path: filePath,
      error: `Failed to load AURA profile: ${message}`,
    };
  }
}

/**
 * Parse and validate an AURA profile from a YAML string.
 */
export function parseAuraProfile(yamlContent: string): AuraLoadResult {
  try {
    const parsed = parseYaml(yamlContent);

    const result = AuraProfileSchema.safeParse(parsed);
    if (!result.success) {
      const issues = result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
      return {
        profile: null,
        path: null,
        error: `AURA validation failed: ${issues}`,
      };
    }

    return {
      profile: result.data,
      path: null,
      error: null,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      profile: null,
      path: null,
      error: `Failed to parse AURA profile: ${message}`,
    };
  }
}

/**
 * Find and load an AURA profile from a directory.
 */
export async function loadAuraFromDirectory(
  dir: string,
  options?: {
    explicitPath?: string;
    agentId?: string;
  },
): Promise<AuraLoadResult> {
  const profilePath = await findAuraProfile(dir, options);

  if (!profilePath) {
    return {
      profile: null,
      path: null,
      error: null, // Not an error - AURA is optional
    };
  }

  return loadAuraProfile(profilePath);
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get trait interpretation text for a given value.
 */
export function interpretTrait(
  trait: keyof AuraPersonality,
  value: number,
): string {
  const interpretations: Record<keyof AuraPersonality, [string, string, string]> = {
    honesty: ["Diplomatic, tactful", "Balanced honesty", "Direct, corrects errors, minimal flattery"],
    emotionality: ["Stoic, calm", "Moderate expression", "Expressive, empathetic"],
    extraversion: ["Reserved, concise", "Balanced engagement", "Elaborate, high energy"],
    agreeableness: ["Critical, debates readily", "Cooperative with standards", "Patient, accommodating"],
    conscientiousness: ["Flexible, spontaneous", "Balanced structure", "Organized, thorough"],
    openness: ["Conventional, practical", "Balanced creativity", "Creative, unconventional"],
  };

  const levels = interpretations[trait];
  if (value <= 3) return levels[0];
  if (value <= 6) return levels[1];
  return levels[2];
}

/**
 * Check if SOMA is enabled in the profile.
 */
export function isSomaEnabled(profile: AuraProfile): boolean {
  return profile.soma?.enabled !== false && profile.soma !== undefined;
}
