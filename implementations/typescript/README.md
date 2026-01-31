# AURA Loader (TypeScript)

TypeScript/JavaScript implementation for loading and converting [AURA](https://github.com/phiro56/AURA) personality profiles.

## Installation

```bash
npm install aura-loader
# or
pnpm add aura-loader
# or
yarn add aura-loader
```

## Quick Start

```typescript
import { loadAuraFromDirectory, auraToPrompt } from 'aura-loader';

// Load an AURA profile from a directory
const result = await loadAuraFromDirectory('./my-agent');

if (result.error) {
  console.error('Failed to load:', result.error);
} else if (result.profile) {
  // Convert to system prompt instructions
  const promptSection = auraToPrompt(result.profile);
  
  // Inject into your system prompt
  const systemPrompt = `You are a helpful assistant.\n\n${promptSection}`;
}
```

## API

### Loading Profiles

```typescript
// Load from directory (auto-discovers AURA.yaml, aura.yaml, or {agentId}.aura.yaml)
const result = await loadAuraFromDirectory('./workspace');

// Load from explicit path
const result = await loadAuraProfile('./path/to/profile.aura.yaml');

// Parse from YAML string
const result = parseAuraProfile(yamlContent);

// Find profile path without loading
const path = await findAuraProfile('./workspace', { agentId: 'myagent' });
```

### Converting to Prompt

```typescript
import { auraToPrompt, auraOneLiner } from 'aura-loader';

// Full prompt section (markdown formatted)
const prompt = auraToPrompt(profile);

// Compact format (less tokens)
const compact = auraToPrompt(profile, { compact: true });

// Without SOMA section
const noSoma = auraToPrompt(profile, { includeSoma: false });

// One-liner summary
const summary = auraOneLiner(profile); // "Clawdio: direct, calm, witty, autonomous"
```

### Validation

```typescript
import { AuraProfileSchema, parseAuraProfile } from 'aura-loader';

// Using Zod schema directly
const result = AuraProfileSchema.safeParse(data);
if (!result.success) {
  console.error(result.error.issues);
}

// Using parse helper
const { profile, error } = parseAuraProfile(yamlString);
```

### Utilities

```typescript
import { interpretTrait, isSomaEnabled, isAntiSycophant } from 'aura-loader';

// Get human-readable trait interpretation
interpretTrait('honesty', 8); // "Direct, corrects errors, minimal flattery"

// Check if SOMA is enabled
if (isSomaEnabled(profile)) {
  // Include soft skills in prompt
}

// Check anti-sycophancy settings
if (isAntiSycophant(profile)) {
  // Profile has strict honesty/adulation limits
}
```

## Types

```typescript
interface AuraProfile {
  aura: string;           // Version (e.g., "1.1")
  name: string;           // Agent name
  personality: {          // HEXACO traits (1-10)
    honesty: number;
    emotionality: number;
    extraversion: number;
    agreeableness: number;
    conscientiousness: number;
    openness: number;
  };
  style?: {               // Optional AI-specific traits
    formality?: number;
    verbosity?: number;
    humor?: number;
    assertiveness?: number;
    autonomy?: number;
  };
  boundaries?: {          // Optional hard constraints
    max_adulation?: number;
    always_correct_errors?: boolean;
    flag_uncertainty?: boolean;
    never?: string[];
    always?: string[];
  };
  soma?: {                // Optional soft skills
    enabled?: boolean;
    context_awareness?: number;
    emotional_intelligence?: number;
    communication?: number;
    ethics?: number;
    adaptability?: number;
  };
  metadata?: {            // Optional metadata
    author?: string;
    description?: string;
    version?: string;
    tags?: string[];
  };
}
```

## Integration Examples

### With OpenAI/Anthropic

```typescript
import OpenAI from 'openai';
import { loadAuraFromDirectory, auraToPrompt } from 'aura-loader';

const result = await loadAuraFromDirectory('./workspace');
const auraSection = result.profile ? auraToPrompt(result.profile) : '';

const client = new OpenAI();
const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { 
      role: 'system', 
      content: `You are a helpful assistant.\n\n${auraSection}` 
    },
    { role: 'user', content: 'Hello!' }
  ]
});
```

### With LangChain

```typescript
import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { loadAuraFromDirectory, auraToPrompt } from 'aura-loader';

const result = await loadAuraFromDirectory('./workspace');
const auraSection = result.profile ? auraToPrompt(result.profile) : '';

const chat = new ChatOpenAI({ model: 'gpt-4' });
const response = await chat.invoke([
  new SystemMessage(`You are a helpful assistant.\n\n${auraSection}`),
  new HumanMessage('Hello!')
]);
```

## License

MIT
