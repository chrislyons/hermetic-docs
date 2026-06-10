---
title: Quick Start
description: Run your first Hermetic pipeline in 5 minutes
---

# Quick Start

## Prerequisites

- [Installation](/docs/install/) complete
- ChatGPT/Claude/Gemini export file ready

## Step 1: Get Your Export

| Platform | How to Export |
|----------|---------------|
| **ChatGPT** | Settings → Data Controls → Export Data → `conversations.json` |
| **Claude** | Settings → Export Data → `conversations.json` |
| **Gemini** | Google Takeout → Gemini → `conversations.json` |
| **Hermes** | Already uses ShareGPT JSONL format |

## Step 2: Import & Curate

```bash
# Auto-detect platform, curate, output ShareGPT format
hermetic import ~/exports/chatgpt/conversations.json --curate -o ./hermetic-output
```

Output:
```text
Import Summary
Platform: chatgpt
Conversations: 1,247
Messages: 8,932
Output Format: sharegpt
Output Dir: ./hermetic-output
```

```text
Curation Stats
Stage                     Input     Output    Removed
Exact Dedup               1,247     1,189     58 (4.7%)
Semantic Dedup (0.95)     1,189     1,156     33 (2.8%)
PII Redaction             1,156     1,156     12 entities
Quality Filter            1,156     1,134     22 (1.9%)
TOTAL                     1,247     1,134     113 (9.1%)
```

## Step 3: Train LoRA Adapter

### Apple Silicon (MLX - Recommended)

```bash
# 8B model, LoRA on 4 layers, 1000 steps
hermetic train ./hermetic-output \
  --model mlx-community/Qwen3-8B-4bit \
  --lora-layers 4 \
  --max-steps 1000 \
  --batch-size 1 \
  --export-gguf
```

Expected output (32GB M1 Max):
```text
Training config: model=mlx-community/Qwen3-8B-4bit, backend=mlx-tune
Data loaded: train=964, val=113, test=57
Memory estimate: base_model_gb=10, lora_overhead_gb=0.5, total=~12.5 GB
Starting training...
Iter 1: Val loss 8.880
...
Iter 1000: Val loss 3.214
Peak memory: 8.2 GB
Adapter saved to: ./hermetic-output/adapters/adapters.safetensors
GGUF exported to: ./hermetic-output/gguf/
```

### Serve with Ollama

```bash
# After GGUF export
ollama create hermetic -f ./hermetic-output/gguf/Modelfile
ollama run hermetic
```

## Step 4: Use with Hermes (Optional)

```bash
# Install plugin
cp -r /path/to/hermetic/hermes-plugin ~/.hermes/plugins/hermetic

# Enable
hermes plugins enable hermetic

# Run via Hermes
hermes hermetic import ~/exports/chatgpt.json --curate
hermes hermetic train ./hermetic-data --model mlx-community/Qwen3-8B-4bit
```

## Full Pipeline in One Config

Create `hermetic.yaml` with your settings, then run:

```bash
hermetic import -c hermetic.yaml
hermetic train ./hermetic-output -c hermetic.yaml
```

## Next Steps

- [Pipeline Deep Dive](/docs/pipeline/import/) — Understand each stage
- [Training Config](/docs/training/mlx/) — MLX LoRA tuning
- [Hermes Plugin](/docs/hermes/plugin/) — Native Hermes integration