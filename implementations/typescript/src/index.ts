/**
 * AURA Protocol - TypeScript Implementation
 *
 * Load, validate, and convert AURA personality profiles to system prompts.
 *
 * @example
 * ```typescript
 * import { loadAuraFromDirectory, auraToPrompt } from 'aura-loader';
 *
 * // Load profile from directory
 * const result = await loadAuraFromDirectory('./workspace');
 * if (result.profile) {
 *   const prompt = auraToPrompt(result.profile);
 *   console.log(prompt);
 * }
 * ```
 *
 * @see https://github.com/phiro56/AURA
 */

// Loader exports
export {
  // Schema & Types
  AuraProfileSchema,
  type AuraProfile,
  type AuraPersonality,
  type AuraStyle,
  type AuraBoundaries,
  type AuraSoma,
  type AuraLoadResult,
  // Loader functions
  findAuraProfile,
  loadAuraProfile,
  parseAuraProfile,
  loadAuraFromDirectory,
  // Utilities
  interpretTrait,
  isSomaEnabled,
} from "./loader.js";

// Prompt converter exports
export {
  type AuraPromptOptions,
  auraToPrompt,
  auraOneLiner,
  isAntiSycophant,
} from "./to-prompt.js";
