---
title: Cloud Training Backends
description: Unsloth Modal and Axolotl for non-Apple Silicon training
---

# Cloud Training Backends

## Overview

For users without Apple Silicon, Hermetic provides cloud training backends:

| Backend | Platform | Best For | Status |
|---------|----------|----------|--------|
| **Unsloth Modal** | Modal.com (GPU cloud) | Fastest LoRA, 2-5x speedup | Production |
| **Axolotl** | Any NVIDIA GPU | Nous/Hermes parity, full YAML config | Production |
| **MLX-Tune** | Apple Silicon only | Local, private, free | Production |

## Unsloth Modal

[Modal](https://modal.com) provides serverless GPU compute. Unsloth is optimized for fast LoRA.

### Setup

```bash
# Install Modal
pip install modal

# Authenticate
modal token new

# Verify
modal run modal_worker.py::test_gpu
```

### Configuration

```yaml
train:
  backend: "unsloth-modal"
  model: "unsloth/Qwen3-8B-bnb-4bit"
  modal:
    gpu: "H100"  # or A100, A10G
    timeout: 3600
  lora:
    r: 16
    alpha: 32
    target_modules: ["q_proj", "v_proj", "k_proj", "o_proj"]
    layers: 16
  unsloth:
    fast_inference: true
    max_seq_length: 2048
```

### Running

```bash
hermetic train ./data -c hermetic.yaml
```

### Modal GPU Options

| GPU | VRAM | Cost/hr | Best For |
|-----|------|---------|----------|
| T4 | 16GB | $0.73 | Small models, testing |
| A10G | 24GB | $1.30 | 7B-13B models |
| A100 | 40GB | $2.50 | Large models, speed |
| H100 | 80GB | $4.50 | Fastest, 70B+ models |