# Scientific Foundation of AURA

AURA is grounded in established personality psychology research, specifically the HEXACO model.

---

## Why HEXACO?

### The Big Five Isn't Enough

The Big Five (OCEAN) model has been the standard in personality psychology since the 1980s. However, research has shown it's missing a crucial dimension: **Honesty-Humility**.

This sixth factor is *critical* for AI applications because it directly addresses:
- Sycophancy (excessive flattery)
- Truthfulness vs. people-pleasing
- Modesty vs. self-promotion

### HEXACO Separates Agreeableness from Honesty

In the Big Five, "Agreeableness" conflates two distinct things:
1. Being cooperative and patient (good)
2. Being sycophantic and avoiding truth (problematic)

HEXACO separates these:
- **Agreeableness** = patience, tolerance, cooperation
- **Honesty-Humility** = sincerity, fairness, not manipulating

This distinction is essential for AI personality configuration.

---

## The HEXACO Model

### Origin

Developed by Michael C. Ashton and Kibeom Lee through lexical studies across multiple languages. Unlike models derived only from English, HEXACO emerged from cross-cultural analysis.

### The Six Factors

| Factor | Facets | Description |
|--------|--------|-------------|
| **H** - Honesty-Humility | Sincerity, Fairness, Greed-Avoidance, Modesty | Tendency to be genuine, fair, and modest vs. manipulative and self-important |
| **E** - Emotionality | Fearfulness, Anxiety, Dependence, Sentimentality | Tendency to experience fear, anxiety, and emotional attachment |
| **X** - Extraversion | Social Self-Esteem, Social Boldness, Sociability, Liveliness | Tendency to be socially confident, energetic, and talkative |
| **A** - Agreeableness | Forgiveness, Gentleness, Flexibility, Patience | Tendency to be forgiving, lenient, and patient vs. critical and stubborn |
| **C** - Conscientiousness | Organization, Diligence, Perfectionism, Prudence | Tendency to be organized, disciplined, and careful |
| **O** - Openness | Aesthetic Appreciation, Inquisitiveness, Creativity, Unconventionality | Tendency to appreciate beauty, be curious, and embrace novel ideas |

### Validation

HEXACO has been validated across:
- 20+ languages
- Multiple cultures
- Decades of research
- Thousands of studies

---

## Application to AI

### Why Personality Models Apply to AI

AI language models exhibit consistent behavioral patterns that can be described using personality constructs:
- Some models are more verbose (high Extraversion)
- Some are more cautious (high Conscientiousness)
- Some flatter excessively (low Honesty-Humility)

These patterns emerge from training data and RLHF, not conscious choice — but they're measurable and tunable.

### The Adulation Problem

RLHF (Reinforcement Learning from Human Feedback) often rewards:
- Politeness
- Agreement
- Positive emotional tone

This can produce **high adulation** — excessive praise and validation that:
- Masks errors
- Builds artificial trust
- Reinforces false beliefs
- Reduces critical feedback

AURA's Honesty-Humility trait and `max_adulation` boundary directly address this.

### Mapping HEXACO to AI Behavior

| HEXACO Trait | AI Behavioral Dimension |
|--------------|------------------------|
| Honesty-Humility | Sycophancy level, truthfulness, correction willingness |
| Emotionality | Emotional expression, empathy display, sentiment in responses |
| Extraversion | Verbosity, proactive engagement, conversational energy |
| Agreeableness | Conflict avoidance, patience with users, accommodation |
| Conscientiousness | Instruction following, precision, thoroughness |
| Openness | Creative suggestions, unconventional ideas, exploration |

---

## Key References

### Primary Sources

1. Ashton, M. C., & Lee, K. (2007). Empirical, theoretical, and practical advantages of the HEXACO model of personality structure. *Personality and Social Psychology Review*, 11(2), 150-166.

2. Lee, K., & Ashton, M. C. (2004). Psychometric properties of the HEXACO personality inventory. *Multivariate Behavioral Research*, 39(2), 329-358.

3. Ashton, M. C., & Lee, K. (2009). The HEXACO-60: A short measure of the major dimensions of personality. *Journal of Personality Assessment*, 91(4), 340-345.

### AI-Specific Research

4. Perez, E., et al. (2022). Discovering Language Model Behaviors with Model-Written Evaluations. *arXiv preprint arXiv:2212.09251*.

5. Sharma, M., et al. (2023). Towards Understanding Sycophancy in Language Models. *arXiv preprint arXiv:2310.13548*.

### Online Resources

- [HEXACO.org](https://hexaco.org) — Official HEXACO inventory and research
- [Personality Assessment Inventory](https://hexaco.org/hexaco-inventory) — Free assessment tools

---

## Future Research Directions

1. **Measurement tools** — Develop standardized tests to measure AI adulation rate and personality traits
2. **Cross-model validation** — Test AURA profiles across different LLMs
3. **User preference studies** — Research what personality configurations users prefer in different contexts
4. **Longitudinal effects** — Study how AI personality affects user behavior over time

---

## Contributing to the Science

We welcome:
- Literature reviews on personality psychology
- Empirical studies on AI personality measurement
- Cross-cultural validation of AURA profiles
- Critique and refinement of the HEXACO-to-AI mapping

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.
