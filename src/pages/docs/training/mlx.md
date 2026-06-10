---
title: MLX LoRA Training
description: Local LoRA training on Apple Silicon with MLX
---

# MLX LoRA Training

## Overview

MLX is Apple's native array framework. Hermetic's MLX backend (`mlx-tune`) provides:

- **Native Apple Silicon** — No CUDA, no Docker, optimal Metal performance
- **QLoRA 4-bit** — 7B/8B models on 32GB RAM
- **LoRA/DoRA** — Configurable rank, alpha, target modules, layers
- **GGUF Export** — Ready for Ollama, llama.cpp

## Hardware Requirements

| Model Size | Quantization | LoRA Layers | Peak RAM | Time (1K steps) |
|------------|--------------|-------------|----------|-----------------|
| 1.5B | 4-bit | 4-8 | ~3 GB | ~2 min |
| 3B | 4-bit | 4-8 | ~5 GB | ~5 min |
| 7B | 4-bit | 4 | ~10 GB | ~15 min |
| 8B | 4-bit | 2-4 | ~10 GB | ~20 min |
| 13B | 4-bit | 1-2 | ~16 GB | ~45 min |

**Validated**: 32GB M1 Max — 8B QLoRA, 4 layers, 1000 steps ≈ 20 min, 8.2 GB peak.