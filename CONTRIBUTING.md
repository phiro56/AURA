# Contributing to AURA

Thank you for your interest in contributing to the AURA protocol!

---

## Ways to Contribute

### 1. New Profiles

Create personality profiles for specific use cases:
- Professional contexts (legal, medical, financial)
- Creative contexts (writing, brainstorming)
- Educational contexts (tutoring, explaining)
- Cultural variations

**To submit a profile:**
1. Create a `.aura.yaml` file following the spec
2. Include clear `metadata` explaining the use case
3. Submit a PR to `profiles/`

### 2. Implementation Guides

Help others implement AURA:
- Model-specific guides (OpenAI, Anthropic, Llama, Mistral, etc.)
- Framework integrations (LangChain, LlamaIndex, etc.)
- Programming language examples

### 3. Research

Contribute to the scientific foundation:
- Literature reviews
- Empirical studies on AI personality
- Measurement tools and methodologies
- Cross-cultural validation

### 4. Translations

Help make AURA accessible globally:
- Translate README and SPEC
- Culturally adapt profiles
- Validate HEXACO mappings across languages

### 5. Tools

Build tools for the ecosystem:
- YAML validators
- Profile generators
- Measurement/evaluation tools
- VS Code extensions

---

## Guidelines

### Code Style

- YAML files: 2-space indentation
- Markdown: One sentence per line
- JSON Schema: Follow draft-07

### Commit Messages

Use conventional commits:
- `feat: add new profile for medical context`
- `docs: improve implementation guide`
- `fix: correct schema validation`

### Pull Requests

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test (validate YAML against schema)
5. Submit PR with clear description

### Profile Quality

Good profiles should:
- Have clear, specific use cases
- Include helpful `metadata.description`
- Be validated against schema
- Include example behaviors in comments

---

## Questions?

- Open an issue for discussion
- Tag with appropriate labels

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
