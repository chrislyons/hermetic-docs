---
title: Installation
description: Install Hermetic and set up your environment
---

# Installation

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Python | 3.11+ | 3.12+ recommended |
| Git | Latest | For repo cloning |
| Apple Silicon (for local training) | M1/M2/M3 Max/Ultra | 32GB+ RAM; MLX only |
| NVIDIA GPU (for cloud backends) | 24GB+ VRAM | Unsloth/Axolotl on Linux |

## Install from Source

```bash
# Clone the repository
git clone https://github.com/chrislyons/hermetic
cd hermetic

# Install in development mode
pip install -e .

# Verify installation
hermetic --help
hermetic platforms
```

## Install from PyPI (Future)

```bash
pip install hermetic
```

## Verify Installation

```bash
# List supported platforms
hermetic platforms

# List output formats
hermetic formats

# Check CLI help
hermetic --help
```

Expected output:
```text
Options:
  --version  -v        Show version and exit
  --help               Show this message and exit.

Commands:
  import     Import and convert chat exports to training formats.
  detect     Detect platform of an export file.
  platforms  List supported platforms.
  formats    List supported output formats.
  train      Train a LoRA adapter on curated conversation data.
  curate     Run curation pipeline on existing normalized data.
```

## Platform-Specific Setup

### macOS (Apple Silicon — Local Training)

```bash
# MLX is native on Apple Silicon
pip install mlx mlx-lm huggingface-hub

# Verify MLX
python -c "import mlx; print(mlx.__version__)"
# 0.23+
```

### Linux (Cloud Training Backends)

```bash
# For Unsloth Modal backend
pip install modal

# For Axolotl backend
pip install axolotl
```

## Development Setup

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/chrislyons/hermetic
cd hermetic

# Install dev dependencies
pip install -e ".[dev]"

# Run tests
pytest tests/ -v

# Lint
ruff check src/
mypy src/
```

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `HF_TOKEN` | Hugging Face API token (gated models) | Optional |
| `MODAL_TOKEN_ID` | Modal cloud training | Cloud backend only |
| `MODAL_TOKEN_SECRET` | Modal cloud training | Cloud backend only |

## Next Steps

- [Quick Start](/docs/quickstart/) — Run your first pipeline
- [Pipeline Overview](/docs/pipeline/import/) — Import, curate, format
- [Training Guide](/docs/training/mlx/) — Local MLX training