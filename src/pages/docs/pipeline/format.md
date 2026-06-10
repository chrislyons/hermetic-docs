---
title: Format Converters
description: Convert normalized conversations to training-ready formats
---

# Format Converters

## Output Formats

| Format | Description | Primary Use Case | Tools |
|--------|-------------|------------------|-------|
| **ShareGPT** | Multi-turn conversations | SFT, Hermes, Unsloth, LLaMA-Factory | Universal |
| **DPO** | Preference pairs (chosen/rejected) | DPO, KTO, ORPO | TRL, Axolotl |
| **GRPO** | Trajectories with rewards | GRPO, PPO, RLHF | Custom |
| **JSONL** | Generic line-delimited | Custom pipelines | Any |
| **Alpaca** | Instruction/Input/Output | Alpaca-style SFT | Legacy |
| **HF** | Hugging Face Datasets | HF Trainer, PEFT | Hugging Face Ecosystem |

## ShareGPT Format

```json
{
  "conversations": [
    {"from": "human", "value": "What is MLX?"},
    {"from": "gpt", "value": "MLX is Apple's array framework..."}
  ],
  "system": "You are a helpful assistant.",
  "metadata": {
    "platform": "chatgpt",
    "source_conversation_id": "conv-123"
  }
}
```

## DPO Format

```json
{
  "prompt": "What is MLX?",
  "chosen": "MLX is Apple's array framework for machine learning...",
  "rejected": "MLX is a graphics library.",
  "metadata": {
    "platform": "chatgpt",
    "preference_source": "synthetic"
  }
}
```

## GRPO Format

```json
{
  "trajectory": [
    {"role": "user", "content": "Solve: 2+2"},
    {"role": "assistant", "content": "4", "reward": 1.0},
    {"role": "user", "content": "Explain"},
    {"role": "assistant", "content": "Addition combines...", "reward": 0.8}
  ],
  "metadata": {
    "task": "math",
    "platform": "chatgpt"
  }
}
```

## JSONL Format

```jsonl
{"messages": [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}], "metadata": {...}}
{"messages": [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}], "metadata": {...}}
```

## Alpaca Format

```json
{
  "instruction": "What is MLX?",
  "input": "",
  "output": "MLX is Apple's array framework...",
  "metadata": { "platform": "chatgpt" }
}
```

## HF Datasets Format

```python
from datasets import Dataset

dataset = Dataset.from_list([
    {
        "messages": [...],
        "metadata": {...}
    }
])
dataset.push_to_hub("user/hermetic-data")
```

## Format Comparison

| Feature | ShareGPT | DPO | GRPO | JSONL | Alpaca | HF |
|---|---|---|---|---|---|---|
| Multi-turn | Yes | No | Yes | Yes | No | Yes |
| Preferences | No | Yes | No | No | No | Yes |
| Rewards | No | No | Yes | No | No | Yes |
| System prompt | Yes | No | No | Yes | No | Yes |
| Metadata | Yes | Yes | Yes | Yes | Yes | Yes |
| Hermes | Yes | Yes | Yes | Yes | No | Yes |
| Unsloth | Yes | Yes | No | Yes | Yes | Yes |
| Axolotl | Yes | Yes | Yes | Yes | Yes | Yes |

## Choosing a Format

Need SFT?           → ShareGPT (default)
Need DPO/KTO/ORPO?  → DPO
Need RLHF/PPO/GRPO? → GRPO
Custom pipeline?    → JSONL
Legacy Alpaca?      → Alpaca
HF Trainer/PEFT?    → HF

## CLI Usage

```bash
# Single format
hermetic import ~/exports/chatgpt.json --format sharegpt

# Multiple formats via config
format:
  primary: "sharegpt"
  also: ["dpo", "grpo"]
```

## Programmatic Usage

```python
from hermetic.formats import get_formatter

formatter = get_formatter("sharegpt")
output = formatter.format(conversations, split="train")

dpo_formatter = get_formatter("dpo")
pairs = dpo_formatter.format(conversations)
```