# AURA

**Agent Universal Response Attributes**

*Your agent's personality should be yours — not a side effect of training.*

---

## What's Your AURA?

Every person has an aura — an energy, a vibe, a way of being in the world.

Your AI agent should have one too. Not the generic personality that OpenAI or Anthropic decided to ship. Not the sycophantic "Great question!" or the robotic "I cannot assist with that." 

**Your AURA. Your rules.**

AURA is an open protocol for defining AI personality — scientifically grounded, portable across models, and entirely in your control.

```yaml
# This is my AURA
personality:
  honesty: 8      # Direct, no sugar-coating
  humor: 6        # Witty when appropriate
  autonomy: 7     # Acts, then reports
boundaries:
  max_adulation: 3  # Zero sycophancy

# This is my SOMA (optional soft skills)
soma:
  context_awareness: 8     # Remembers, anticipates
  emotional_intelligence: 6  # Reads the room
  adaptability: 7          # Learns from feedback
```

---

## Why AURA?

Every AI model comes with baked-in personality biases from pretraining and RLHF. Some are sycophantic. Some are overly cautious. Some are robotic.

**AURA lets humans define the personality they want** — not the personality Big Tech decided to ship.

### The Problem

- Models default to excessive praise ("Great question!") even when unwarranted
- RLHF rewards agreeableness over honesty
- Personality is model-dependent and non-portable
- No standard way to specify "how" an AI should behave

### The Solution

A universal, scientifically-grounded protocol that:

1. **Defines personality traits** based on HEXACO psychology model
2. **Is portable** — works across OpenAI, Anthropic, open-source models
3. **Is configurable** — humans choose their preferred balance
4. **Is measurable** — you can evaluate if a model follows the spec

---

## Quick Start

```yaml
# my-agent.aura.yaml
aura: "1.0"
name: "MyAgent"

personality:
  honesty: 8
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

boundaries:
  max_adulation: 3
  always_correct_errors: true
```

Then include in your system prompt:
```
[Load AURA profile: my-agent.aura.yaml]
```

See [implementations/](./implementations/) for model-specific guides.

---

## The Science

AURA is grounded in the **HEXACO model** of personality — a well-validated psychological framework with decades of peer-reviewed research.

| Trait | What it measures | AI Application |
|-------|------------------|----------------|
| **H**onesty-Humility | Sincerity, fairness, modesty | Anti-sycophancy, truthfulness |
| **E**motionality | Anxiety, sentimentality, dependence | Emotional expression level |
| **X** (Extraversion) | Sociability, liveliness, expressiveness | Verbosity, initiative |
| **A**greeableness | Patience, tolerance, gentleness | Cooperation (not submission) |
| **C**onscientiousness | Organization, diligence, perfectionism | Structure, following instructions |
| **O**penness | Creativity, curiosity, unconventionality | Novel responses, exploration |

See [science/FOUNDATION.md](./science/FOUNDATION.md) for research references.

---

## Adulation Rate

A key metric AURA addresses: **how often an AI flatters instead of informing**.

```
Adulation Rate = (Adulating responses) / (Total responses)
```

High adulation:
- "That's an incredibly insightful question!" (for basic prompts)
- "You're absolutely right" (when they're wrong)
- Soft agreement instead of correction

AURA's `honesty` trait and `max_adulation` boundary directly control this.

---

## SOMA — Soft Skills (Optional)

While AURA defines *who* your agent is, **SOMA** (Skill Operations & Mental Agility) defines *what* your agent can do.

| Skill | What it measures |
|-------|------------------|
| `context_awareness` | State modeling, memory, coherence |
| `emotional_intelligence` | Sentiment-aware responses |
| `communication` | Style adaptation, clarity |
| `ethics` | Refusal handling, uncertainty disclosure |
| `adaptability` | Feedback integration, learning |

SOMA is optional — omit it for AURA-only mode, or add it for a complete agent definition.

```yaml
soma:
  enabled: true
  context_awareness: 7
  emotional_intelligence: 6
  communication: 6
  ethics: 8
  adaptability: 7
```

See [SPEC.md](./SPEC.md#6-soma--soft-skills--capabilities-optional) for full documentation.

---

## Archetypes — Quick Start

Don't know where to start? Pick an archetype based on what you need:

| Archetype | Personality | Best For |
|-----------|-------------|----------|
| 🔬 **The Analyst** | High honesty, high conscientiousness | Research, code review, fact-checking |
| 🎨 **The Creative** | High openness, playful | Brainstorming, writing, ideation |
| 🎓 **The Mentor** | High agreeableness, warm | Teaching, coaching, onboarding |
| 💼 **The Executive** | High extraversion, decisive | Project management, productivity |
| 🤝 **The Diplomat** | High agreeableness, tactful | Customer service, mediation, sales |
| 🧪 **The Scientist** | High honesty, high openness | Scientific analysis, critical thinking |

See [profiles/archetypes/](./profiles/archetypes/) for ready-to-use configurations.

---

## Basic Profiles

Simpler starting points:

| Profile | Description | Use Case |
|---------|-------------|----------|
| `balanced` | Default, moderate on all traits | General assistant |
| `direct` | High honesty, low adulation, assertive | Technical work, research |
| `warm` | Higher agreeableness, emotionality | Support, companionship |
| `clinical` | Minimal emotion, maximum precision | Medical, legal, factual |

See [profiles/](./profiles/) for all configurations.

---

## Contributing

AURA is open source and community-driven. We welcome:

- New profile templates
- Implementation guides for different models
- Research on personality measurement
- Translations

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## Roadmap

- [ ] v1.0 Specification finalized
- [ ] JSON Schema for validation
- [ ] Implementation guides (OpenAI, Anthropic, Llama, Mistral)
- [ ] Measurement tools (evaluate if model follows AURA spec)
- [ ] Community profiles repository
- [ ] Academic paper on AI personality portability

---

## License

MIT — Use freely, contribute back.

---

## Authors

Created by [Daniel Phillips](https://github.com/phiro56) and [Clawdio](https://github.com/phiro56/AURA).

*"Your agent's personality should be your choice, not a side effect of training."*
