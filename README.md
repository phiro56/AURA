<p align="center">
  <h1 align="center">🎭 AURA</h1>
  <p align="center"><strong>Agent Universal Response Attributes</strong></p>
  <p align="center"><em>Your agent's personality. Your rules.</em></p>
</p>

<p align="center">
  <a href="https://github.com/phiro56/AURA/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="https://github.com/phiro56/AURA/releases"><img src="https://img.shields.io/badge/version-1.1.0-green.svg" alt="Version"></a>
  <a href="https://www.clawhub.ai/skills/aura"><img src="https://img.shields.io/badge/ClawHub-aura-orange.svg" alt="ClawHub"></a>
  <a href="https://github.com/openclaw/openclaw/discussions/5826"><img src="https://img.shields.io/badge/OpenClaw-Discussion-purple.svg" alt="OpenClaw Discussion"></a>
</p>

---

## ⚡ Quick Start (Recommended)

**Using OpenClaw or Clawdbot?** Install in seconds:

```bash
clawhub install aura
```

Then run:

```
/aura
```

That's it! The command walks you through personality configuration interactively.

👉 **[View on ClawHub](https://www.clawhub.ai/skills/aura)**

---

## What is AURA?

AURA is an open protocol for defining AI agent personality — scientifically grounded in psychology research, portable across models, and entirely in your control.

```yaml
# Example: A direct, no-nonsense assistant
personality:
  honesty: 8      # Direct, no sugar-coating
  humor: 6        # Witty when appropriate
  autonomy: 7     # Acts, then reports

boundaries:
  max_adulation: 3  # Zero sycophancy
```

**The problem:** AI models come with baked-in personality biases. Some are sycophantic ("Great question!"). Some are robotic. None are *yours*.

**The solution:** AURA lets you define the personality you want — not the personality Big Tech decided to ship.

---

## 🔬 The Science

AURA uses the **HEXACO model** — a well-validated personality framework with 20+ years of peer-reviewed research.

| Trait | AI Application |
|-------|----------------|
| **H**onesty-Humility | Anti-sycophancy, truthfulness |
| **E**motionality | Emotional expression level |
| **X** (Extraversion) | Verbosity, initiative |
| **A**greeableness | Cooperation (not submission) |
| **C**onscientiousness | Structure, following instructions |
| **O**penness | Creative, unconventional responses |

See [science/FOUNDATION.md](./science/FOUNDATION.md) for research references.

---

## 🎭 Archetypes

Don't know where to start? Pick a preset:

| Archetype | Best For |
|-----------|----------|
| 🔬 **The Analyst** | Research, code review, fact-checking |
| 🎨 **The Creative** | Brainstorming, writing, ideation |
| 🎓 **The Mentor** | Teaching, coaching, onboarding |
| 💼 **The Executive** | Project management, productivity |
| 🤝 **The Diplomat** | Customer service, mediation |
| 🧪 **The Scientist** | Scientific analysis, critical thinking |

See [profiles/archetypes/](./profiles/archetypes/) for configurations.

---

## 📊 Adulation Rate

A key metric AURA addresses: **how often an AI flatters instead of informs**.

```
Adulation Rate = (Adulating responses) / (Total responses)
```

High adulation = "That's an incredibly insightful question!" (for basic prompts)

AURA's `max_adulation` boundary directly controls this. Set it low for honest feedback.

---

## 🛠️ Installation Options

### Option 1: ClawHub Skill (Easiest)

```bash
clawhub install aura
/aura
```

### Option 2: npm Package (For Developers)

```bash
npm install aura-loader
```

```typescript
import { loadAuraFromDirectory, auraToPrompt } from 'aura-loader';

const { profile } = await loadAuraFromDirectory('./workspace');
const promptSection = auraToPrompt(profile);
```

See [implementations/typescript/](./implementations/typescript/) for full API.

### Option 3: Manual Setup

Create `AURA.yaml` in your workspace:

```yaml
aura: "1.1"
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
  autonomy: 6

boundaries:
  max_adulation: 3
  always_correct_errors: true
  flag_uncertainty: true
```

See [SPEC.md](./SPEC.md) for full specification.

---

## 📁 Project Structure

```
AURA/
├── SPEC.md                    # Full protocol specification
├── CHANGELOG.md               # Version history
├── schema/
│   └── aura.schema.json       # JSON Schema for validation
├── profiles/
│   ├── archetypes/            # Pre-built personality archetypes
│   └── *.aura.yaml            # Example profiles
├── implementations/
│   └── typescript/            # npm: aura-loader
├── skills/
│   └── aura/                  # ClawHub skill
└── science/
    └── FOUNDATION.md          # Research references
```

---

## 🗺️ Roadmap

- [x] v1.1 Specification
- [x] JSON Schema for validation
- [x] TypeScript implementation
- [x] ClawHub skill
- [ ] Python implementation
- [ ] Measurement tools
- [ ] Community profiles repository
- [ ] VS Code extension

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

**Quick ways to contribute:**
- Submit new personality profiles
- Add implementation guides for other frameworks
- Improve documentation
- Report bugs or suggest features

---

## 📜 License

MIT — Use freely, contribute back.

---

## 🔗 Links

- **ClawHub Skill:** [clawhub.ai/skills/aura](https://www.clawhub.ai/skills/aura)
- **OpenClaw Discussion:** [github.com/openclaw/openclaw/discussions/5826](https://github.com/openclaw/openclaw/discussions/5826)
- **npm Package:** `aura-loader`
- **Specification:** [SPEC.md](./SPEC.md)

---

<p align="center">
  <em>Created by <a href="https://github.com/phiro56">Daniel Phillips</a> and <a href="https://moltbook.com/u/ClawdioPhillips">Clawdio</a></em><br>
  <em>"Your agent's personality should be your choice, not a side effect of training."</em>
</p>
