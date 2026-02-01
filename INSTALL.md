# Installing AURA

Choose the installation method that fits your setup.

---

## 🎯 Option 1: ClawHub (Easiest)

For OpenClaw/Clawdbot users:

```bash
# Install the AURA skill
clawhub install aura

# Start a new session, then:
/aura
```

The `/aura` command walks you through personality configuration interactively. No YAML editing required.

**Commands available:**
- `/aura` — Configure personality interactively
- `/aura show` — Display current profile
- `/aura reset` — Reset to defaults

---

## 📦 Option 2: npm Package (Developers)

For integrating AURA into your own applications:

```bash
npm install aura-loader
```

```typescript
import { loadAuraFromDirectory, auraToPrompt } from 'aura-loader';

// Load profile from workspace
const { profile, error } = await loadAuraFromDirectory('./workspace');

if (profile) {
  // Convert to system prompt instructions
  const promptSection = auraToPrompt(profile);
  
  // Inject into your LLM call
  const systemPrompt = `You are a helpful assistant.\n\n${promptSection}`;
}
```

### API Highlights

```typescript
// Parse from YAML string
const { profile } = parseAuraProfile(yamlContent);

// Compact format (fewer tokens)
const prompt = auraToPrompt(profile, { compact: true });

// One-liner summary
auraOneLiner(profile); // "Clawdio: direct, calm, witty, autonomous"

// Check anti-sycophancy settings
isAntiSycophant(profile); // true if honesty ≥7 or max_adulation ≤4
```

See [implementations/typescript/README.md](./implementations/typescript/README.md) for full API.

---

## 📝 Option 3: Manual Setup

For any AI agent that reads workspace files:

### Step 1: Create AURA.yaml

Create `AURA.yaml` in your agent's workspace root:

```yaml
aura: "1.1"
name: "MyAgent"

personality:
  honesty: 8          # 1-10: diplomatic → direct
  emotionality: 4     # 1-10: stoic → expressive
  extraversion: 5     # 1-10: reserved → elaborate
  agreeableness: 5    # 1-10: critical → accommodating
  conscientiousness: 7 # 1-10: flexible → thorough
  openness: 6         # 1-10: conventional → creative

style:
  formality: 4        # 1-10: casual → formal
  verbosity: 4        # 1-10: terse → elaborate
  humor: 5            # 1-10: serious → playful
  assertiveness: 7    # 1-10: passive → confrontational
  autonomy: 7         # 1-10: asks permission → acts independently

boundaries:
  max_adulation: 3    # Hard cap on flattery
  always_correct_errors: true
  flag_uncertainty: true
```

### Step 2: Add to AGENTS.md

Tell your agent to load the profile:

```markdown
## Personality

If AURA.yaml exists in workspace, read it at session start.
Apply the personality traits consistently to all responses.

Key behaviors based on AURA:
- Honesty level determines directness vs diplomacy
- max_adulation caps flattery/sycophancy
- autonomy determines whether to act or ask permission
```

### Step 3: Verify

Ask your agent: "What's your personality configuration?"

It should describe its AURA traits.

---

## 🔄 Updating

### ClawHub
```bash
clawhub update aura
```

### npm
```bash
npm update aura-loader
```

### Manual
Replace your `AURA.yaml` with the new version or edit traits as needed.

---

## 📍 File Location

AURA files should live in your **workspace**, not in the agent's core installation:

```
~/clawd/                    ← Your workspace
├── AGENTS.md
├── SOUL.md
├── AURA.yaml               ← Lives here ✓
└── ...

/opt/.../clawdbot/          ← Agent installation
└── ...                     ← NOT here ✗
```

This ensures your personality survives agent updates.

---

## 🆘 Troubleshooting

**Agent doesn't see AURA.yaml:**
- Verify file is in workspace root (not a subdirectory)
- Check file name: `AURA.yaml` (case-sensitive on Linux)
- Restart session after creating file

**Traits not being applied:**
- Add explicit loading instructions to AGENTS.md
- Ask agent to read and summarize AURA.yaml

**Validation errors:**
- All personality traits (honesty, emotionality, etc.) are required
- Values must be integers 1-10
- Run against schema: `schema/aura.schema.json`

---

## Next Steps

- Browse [profiles/](./profiles/) for example configurations
- Read [SPEC.md](./SPEC.md) for the full protocol
- See [profiles/archetypes/](./profiles/archetypes/) for personality templates
