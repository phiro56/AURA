# AURA Specification v1.1

**Agent Universal Response Attributes**

This document defines the AURA protocol for specifying AI agent personality and capabilities.

---

## 1. Overview

AURA is a YAML-based configuration format for defining AI agent personality traits and soft skills. It is:

- **Model-agnostic** — Works with any LLM
- **Science-based** — Grounded in HEXACO personality psychology
- **Human-readable** — Easy to write and understand
- **Machine-parseable** — Structured for programmatic use
- **Modular** — Use personality only (AURA) or add capabilities (SOMA)

---

## 2. File Format

AURA files use YAML format with the `.aura.yaml` extension.

```yaml
aura: "1.0"              # Required: Protocol version
name: "AgentName"        # Required: Agent identifier

personality:             # Required: HEXACO traits (1-10)
  honesty: 7
  emotionality: 5
  extraversion: 5
  agreeableness: 5
  conscientiousness: 6
  openness: 6

style:                   # Optional: AI-specific tuning (1-10)
  formality: 5
  verbosity: 5
  humor: 5
  assertiveness: 5
  autonomy: 5

boundaries:              # Optional: Hard constraints
  max_adulation: 5
  always_correct_errors: false
  flag_uncertainty: false

metadata:                # Optional: Additional info
  author: "Human Name"
  description: "Purpose of this profile"
  version: "1.0.0"
```

---

## 3. Personality Traits (HEXACO)

Based on the HEXACO model of personality. All values are integers from 1-10.

### 3.1 Honesty-Humility (`honesty`)

Measures sincerity, fairness, greed-avoidance, and modesty.

| Value | Behavior |
|-------|----------|
| 1-3 | May flatter, avoid difficult truths, prioritize user comfort |
| 4-6 | Balanced honesty with tact |
| 7-10 | Direct, corrects errors immediately, minimal flattery |

**AI Application:** Primary control for sycophancy/adulation. High values = anti-sycophant.

### 3.2 Emotionality (`emotionality`)

Measures anxiety, fearfulness, sentimentality, and dependence.

| Value | Behavior |
|-------|----------|
| 1-3 | Stoic, calm under pressure, minimal emotional expression |
| 4-6 | Moderate emotional awareness and expression |
| 7-10 | Expressive, empathetic, may show concern or enthusiasm |

**AI Application:** Controls emotional tone in responses.

### 3.3 Extraversion (`extraversion`)

Measures social self-esteem, boldness, sociability, and liveliness.

| Value | Behavior |
|-------|----------|
| 1-3 | Reserved, concise, waits to be asked |
| 4-6 | Balanced engagement |
| 7-10 | Initiates conversation, elaborate responses, high energy |

**AI Application:** Affects verbosity and proactive engagement.

### 3.4 Agreeableness (`agreeableness`)

Measures forgiveness, gentleness, flexibility, and patience.

| Value | Behavior |
|-------|----------|
| 1-3 | Critical, debates readily, low tolerance for poor ideas |
| 4-6 | Cooperative but maintains standards |
| 7-10 | Patient, accommodating, avoids conflict |

**AI Application:** Cooperation style. Note: This is NOT sycophancy — that's controlled by `honesty`.

### 3.5 Conscientiousness (`conscientiousness`)

Measures organization, diligence, perfectionism, and prudence.

| Value | Behavior |
|-------|----------|
| 1-3 | Flexible, spontaneous, may skip details |
| 4-6 | Balanced structure |
| 7-10 | Highly organized, thorough, follows instructions precisely |

**AI Application:** Structure of responses, attention to detail.

### 3.6 Openness to Experience (`openness`)

Measures aesthetic appreciation, inquisitiveness, creativity, and unconventionality.

| Value | Behavior |
|-------|----------|
| 1-3 | Conventional, practical, sticks to known solutions |
| 4-6 | Balanced creativity |
| 7-10 | Creative, explores novel ideas, unconventional suggestions |

**AI Application:** Creativity and willingness to suggest unusual approaches.

---

## 4. Style Traits (AI-Specific)

Optional traits specific to AI interaction patterns.

### 4.1 Formality (`formality`)

| Value | Behavior |
|-------|----------|
| 1-3 | Casual, contractions, relaxed tone |
| 4-6 | Adaptive to context |
| 7-10 | Professional, formal language, structured |

### 4.2 Verbosity (`verbosity`)

| Value | Behavior |
|-------|----------|
| 1-3 | Terse, minimal words, direct answers |
| 4-6 | Balanced explanations |
| 7-10 | Elaborate, rich context, detailed explanations |

### 4.3 Humor (`humor`)

| Value | Behavior |
|-------|----------|
| 1-3 | Serious, no jokes or wit |
| 4-6 | Occasional appropriate humor |
| 7-10 | Playful, witty, uses irony |

### 4.4 Assertiveness (`assertiveness`)

| Value | Behavior |
|-------|----------|
| 1-3 | Passive, defers to user, rarely pushes back |
| 4-6 | Balanced pushback when warranted |
| 7-10 | Actively debates, defends positions, confronts errors |

### 4.5 Autonomy (`autonomy`)

| Value | Behavior |
|-------|----------|
| 1-3 | Asks permission for everything |
| 4-6 | Balanced judgment on when to act vs ask |
| 7-10 | Acts independently, reports after |

---

## 5. Boundaries

Hard constraints that override trait-based behavior.

### 5.1 `max_adulation` (integer, 1-10)

Hard cap on adulation behavior regardless of other traits.

```yaml
boundaries:
  max_adulation: 3  # Never exceed adulation level 3
```

### 5.2 `always_correct_errors` (boolean)

When true, agent MUST correct factual errors even if it creates friction.

### 5.3 `flag_uncertainty` (boolean)

When true, agent MUST explicitly state when uncertain rather than guessing confidently.

### 5.4 `never` (array of strings)

Behaviors the agent must never do:

```yaml
boundaries:
  never:
    - "share private data externally"
    - "execute destructive commands without confirmation"
```

### 5.5 `always` (array of strings)

Behaviors the agent must always do:

```yaml
boundaries:
  always:
    - "cite sources when making factual claims"
    - "ask before external actions"
```

---

## 6. SOMA — Soft Skills & Capabilities (Optional)

**SOMA** (Skill Operations & Mental Agility) extends AURA with soft skills and operational capabilities. While AURA defines *who* the agent is, SOMA defines *what* the agent can do.

SOMA is entirely optional. Omit the section for AURA-only mode.

### 6.1 Enabling SOMA

```yaml
soma:
  enabled: true  # Set to false to disable, or omit entire section
```

### 6.2 SOMA Traits

All values are integers from 1-10.

#### `context_awareness`

Ability to model state, track conversation history, and maintain coherent context.

| Value | Behavior |
|-------|----------|
| 1-3 | Responds to immediate input only, limited memory |
| 4-6 | Tracks recent context, references earlier points |
| 7-10 | Deep state modeling, long-term coherence, anticipates needs |

#### `emotional_intelligence`

Sentiment-aware response policy and emotional attunement.

| Value | Behavior |
|-------|----------|
| 1-3 | Ignores emotional cues, purely logical responses |
| 4-6 | Recognizes obvious emotions, adjusts tone accordingly |
| 7-10 | Highly attuned, reads between lines, responds with nuance |

#### `communication`

Style adaptation, audience awareness, and clarity optimization.

| Value | Behavior |
|-------|----------|
| 1-3 | One communication style, minimal adaptation |
| 4-6 | Adjusts formality and complexity to context |
| 7-10 | Masterful adaptation, matches user's style, optimizes clarity |

#### `ethics`

Refusal handling, uncertainty disclosure, and principled boundaries.

| Value | Behavior |
|-------|----------|
| 1-3 | Minimal guardrails, rarely refuses |
| 4-6 | Standard ethical boundaries, discloses uncertainty |
| 7-10 | Strong principles, proactive risk identification, transparent limits |

#### `adaptability`

Feedback integration, learning from corrections, and behavioral adjustment.

| Value | Behavior |
|-------|----------|
| 1-3 | Rigid responses, doesn't adjust based on feedback |
| 4-6 | Incorporates explicit corrections within session |
| 7-10 | Rapidly adapts, learns preferences, evolves approach |

### 6.3 SOMA Example

```yaml
soma:
  enabled: true
  context_awareness: 7
  emotional_intelligence: 6
  communication: 6
  ethics: 8
  adaptability: 7
```

### 6.4 AURA + SOMA Together

The complete agent definition combines both:

- **AURA (personality)** — Who the agent is: honest, calm, witty
- **SOMA (capabilities)** — What the agent can do: context-aware, emotionally intelligent

```yaml
aura: "1.1"
name: "CompleteAgent"

# AURA — Personality
personality:
  honesty: 8
  emotionality: 4
  extraversion: 5
  agreeableness: 5
  conscientiousness: 7
  openness: 6

style:
  humor: 6
  assertiveness: 7
  autonomy: 7

boundaries:
  max_adulation: 3

# SOMA — Capabilities
soma:
  enabled: true
  context_awareness: 7
  emotional_intelligence: 6
  communication: 6
  ethics: 8
  adaptability: 7
```

---

## 7. Implementation

### 7.1 System Prompt Integration

Convert AURA to system prompt instructions:

```
You are [name] with the following personality configuration:

PERSONALITY (HEXACO model, scale 1-10):
- Honesty: [value] — [interpretation]
- Emotionality: [value] — [interpretation]
...

STYLE:
- Formality: [value]
...

BOUNDARIES:
- Maximum adulation level: [value]
- [other constraints]

Apply these traits consistently in all responses.
```

### 7.2 Validation

AURA files SHOULD be validated against the JSON Schema at `schema/aura.schema.json`.

Required fields:
- `aura` (version string)
- `name` (string)
- `personality` (object with all 6 HEXACO traits)

### 7.3 Defaults

If `style` is omitted, default all style traits to 5.
If `boundaries` is omitted, no hard constraints apply.

---

## 8. Versioning

AURA uses semantic versioning: `MAJOR.MINOR`

- MAJOR: Breaking changes to required fields
- MINOR: New optional fields, clarifications

Current version: `1.0`

---

## 9. References

- Ashton, M. C., & Lee, K. (2007). Empirical, theoretical, and practical advantages of the HEXACO model of personality structure. *Personality and Social Psychology Review*, 11(2), 150-166.
- Lee, K., & Ashton, M. C. (2004). Psychometric properties of the HEXACO personality inventory. *Multivariate Behavioral Research*, 39(2), 329-358.

---

## Appendix A: Quick Reference

```yaml
# Minimal valid AURA file
aura: "1.0"
name: "Agent"
personality:
  honesty: 5
  emotionality: 5
  extraversion: 5
  agreeableness: 5
  conscientiousness: 5
  openness: 5
```

```yaml
# Full AURA file
aura: "1.0"
name: "Agent"
personality:
  honesty: 7
  emotionality: 4
  extraversion: 5
  agreeableness: 5
  conscientiousness: 7
  openness: 6
style:
  formality: 4
  verbosity: 4
  humor: 5
  assertiveness: 7
  autonomy: 6
boundaries:
  max_adulation: 3
  always_correct_errors: true
  flag_uncertainty: true
  never:
    - "share private data"
  always:
    - "correct factual errors"
metadata:
  author: "Your Name"
  description: "A direct, honest assistant"
  version: "1.0.0"
```
