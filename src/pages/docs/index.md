---
title: Getting Started
description: Installation, quick start, first pipeline run
---

# Getting Started

Welcome to Hermetic — the pipeline for turning your AI chat exports into personalized Hermes agents.

## Quick Links

| Guide | Description |
|-------|-------------|
| [Installation](/docs/getting-started/install/) | Install Hermetic and set up your environment |
| [Quick Start](/docs/getting-started/quickstart/) | Run your first pipeline in 5 minutes |

## Pipeline Overview

```text
Flowchart LR
    A[ChatGPT Export] --> D[Normalize]
    B[Claude Export] --> D
    C[Gemini Export] --> D
    D --> E[Curate<br/>Dedup · PII · Quality]
    E --> F[Format<br/>ShareGPT · DPO · GRPO]
    F --> G[Train<br/>MLX LoRA]
    G --> H[Adapter]
    H --> I[Hermes Agent]
```

## Why Hermetic?

| Problem | Solution |
|---------|----------|
| Chat exports trapped in vendor formats | **4 importers** → unified Conversation schema |
| Garbage in, garbage out | **Curation pipeline** — exact/semantic dedup, PII redaction, quality filters |
| Training formats differ | **6 formatters** — ShareGPT, DPO, GRPO, JSONL, Alpaca, HF |
| Local training is hard | **MLX backend** — native Apple Silicon, 32GB M1 Max validated |
| No path to personalized agent | **Hermes plugin** — `hermes hermetic import/train/status` |

## Quick Start

```bash
# Install
pip install -e /path/to/hermetic

# Import & curate your exports
hermetic import ~/exports/chatgpt.json --curate -o ./hermetic-data

# Train a LoRA adapter (Apple Silicon)
hermetic train ./hermetic-data --model mlx-community/Qwen3-8B-4bit --lora-layers 4

# Or use the Hermes plugin
hermes skills install official/mlops/hermetic
hermes hermetic import ~/exports/chatgpt.json --curate
```

## Pipeline Overview

| Stage | Description |
|-------|-------------|
| **Import** | ChatGPT, Claude, Gemini, Hermes exports normalized to `Conversation` schema |
| **Curate** | Exact dedup, semantic dedup (embeddings), Presidio PII, quality filters |
| **Format** | ShareGPT, DPO, GRPO, JSONL, Alpaca, HF Datasets |
| **Train** | MLX LoRA on Apple Silicon; Unsloth/Axolotl cloud backends stubbed |
| **Integrate** | Hermes plugin: `hermes hermetic import|train|status` |

---

**Hermetic** is open-source (MIT). Built for [Hermes Agent](https://github.com/NousResearch/hermes-agent) by Nous Research.