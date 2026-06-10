---
title: Configuration Reference
description: Complete hermetic.yaml schema reference
---

# Configuration Reference

## Full Schema

```yaml
# hermetic.yaml - Complete configuration

import:
  sources:
    - path: "~/exports/chatgpt/conversations.json"
      # platform: "chatgpt"  # optional override
    - path: "~/exports/claude/conversations.json"
    - path: "~/exports/gemini/Takeout/Gemini/"

curate:
  deduplicate:
    enabled: true
    exact_match: true
    semantic_threshold: 0.95    # 0.0-1.0
    # model: "all-MiniLM-L6-v2"  # embedding model

  pii_redact:
    enabled: true
    entities:
      - PERSON
      - EMAIL_ADDRESS
      - PHONE_NUMBER
      - LOCATION
      - CREDIT_CARD
      - CRYPTO_WALLET
      - IP_ADDRESS
      - URL
    custom_patterns: []  # regex patterns

  quality:
    enabled: true
    min_messages: 2
    max_tokens: 8192
    min_user_ratio: 0.1
```text
 0.1
    max_user_ratio: 0.9
    min_avg_message_len: 10
    max_avg_message_len: 2000
    remove_system_only: true

format:
  primary: "sharegpt"          # Primary output format
  also: ["dpo", "grpo"]        # Additional formats
  split:
    train: 0.85
    validation: 0.10
    test: 0.05
  random_seed: 42

train:
  backend: "mlx-tune"          # mlx-tune | unsloth-modal | axolotl
  model: "mlx-community/Qwen3-8B-4bit"

  # MLX-Tune specific
  mlx_tune: {}

  # Unsloth Modal specific
  unsloth_modal:
    gpu: "H100"
    timeout: 3600

  # Axolotl specific
  axolotl:
    config_path: "./axolotl-config.yml"

  lora:
    r: 16                      # LoRA rank
    alpha: 32                  # LoRA alpha (typically 2*r)
    target_modules:            # Target attention modules
      - "q_proj"
      - "v_proj"
      # - "k_proj"
      # - "o_proj"
    layers: 4                  # Number of layers from top
    dropout: 0.05
    use_dora: false            # DoRA instead of LoRA

  schedule:
    max_steps: 1000
    learning_rate: 2e-4
    batch_size: 1
    max_seq_length: 1024
    grad_accum: 4
    grad_checkpoint: true
    warmup_steps: 50
    lr_scheduler: "cosine"
    weight_decay: 0.01
    save_every: 100
    eval_every: 100
    log_every: 10

  gpu_budget:
    reserved_for_inference: "16GB"
    max_training: "14GB"
    pause_threshold: "8GB"

  export:
    gguf: true
    quantize: "q4_k_m"         # q4_k_m | q5_k_m | q8_0
    ollama: true

output:
  formats:
    - "mlx_adapters"
    - "gguf_4bit"
  ollama:
    enabled: true
    tag: "hermetic:latest"
    modelfile_template: |
      FROM {{gguf_path}}
      TEMPLATE "{{chat_template}}"
      PARAMETER stop "{{stop_tokens}}"
```

## Field Reference

### Import

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `sources[].path` | string | — | Path to export file/directory |
| `sources[].platform` | string | auto | Force platform: chatgpt, claude, gemini, hermes |

### Curate

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `deduplicate.enabled` | bool | true | Enable deduplication |
| `deduplicate.exact_match` | bool | true | SHA-256 exact dedup |
| `deduplicate.semantic_threshold` | float | 0.95 | Cosine similarity threshold |
| `pii_redact.enabled` | bool | true | Enable PII redaction |
| `pii_redact.entities` | array | Presidio defaults | Entity types to redact |
| `quality.enabled` | bool | true | Enable quality filtering |
| `quality.min_messages` | int | 2 | Min turns per conversation |
| `quality.max_tokens` | int | 8192 | Max tokens per conversation |
| `quality.min_user_ratio` | float | 0.1 | Min user message ratio |

### Format

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `primary` | string | sharegpt | Primary output format |
| `also` | array | [] | Additional formats |
| `split.train` | float | 0.85 | Train split ratio |
| `split.validation` | float | 0.10 | Validation split |
| `split.test` | float | 0.05 | Test split |

### Train

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `backend` | string | mlx-tune | mlx-tune, unsloth-modal, axolotl |
| `model` | string | — | HF repo or local path |
| `lora.r` | int | 16 | LoRA rank |
| `lora.alpha` | int | 32 | LoRA alpha |
| `lora.target_modules` | array | ["q_proj","v_proj"] | Target modules |
| `lora.layers` | int | 4 | Layers to adapt |
| `lora.dropout` | float | 0.05 | Dropout |
| `lora.use_dora` | bool | false | Use DoRA |
| `schedule.max_steps` | int | 1000 | Training steps |
| `schedule.learning_rate` | float | 2e-4 | Learning rate |
| `schedule.batch_size` | int | 1 | Batch size |
| `schedule.max_seq_length` | int | 1024 | Context length |
| `schedule.grad_accum` | int | 4 | Gradient accumulation |
| `export.gguf` | bool | true | Export GGUF |
| `export.quantize` | string | q4_k_m | GGUF quantization |

### Output

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `formats` | array | ["mlx_adapters", "gguf_4bit"] | Artifact formats |
| `ollama.enabled` | bool | true | Create Ollama model |
| `ollama.tag` | string | hermetic:latest | Ollama tag |

## Environment Variable Overrides

Any config value can be overridden via environment variables:

```bash
HERMETIC_TRAIN_BACKEND=unsloth-modal \
HERMETIC_TRAIN_MODEL=unsloth/Qwen3-8B-bnb-4bit \
HERMETIC_TRAIN_LORA_LAYERS=8 \
hermetic train ./data -c hermetic.yaml
```

Pattern: `HERMETIC_<SECTION>_<FIELD>` (uppercase, nested with `_`)

## Example: Minimal Config

```yaml
import:
  sources:
    - path: "~/exports/chatgpt.json"

train:
  model: "mlx-community/Qwen3-8B-4bit"
  lora:
    layers: 4
```

## Example: Production Config

```yaml
import:
  sources:
    - path: "~/exports/chatgpt/conversations.json"
    - path: "~/exports/claude/conversations.json"

curate:
  deduplicate:
    semantic_threshold: 0.93
  pii_redact:
    custom_patterns:
      - "API_KEY_[A-Z0-9]{32}"

train:
  backend: "mlx-tune"
  model: "mlx-community/Qwen3-8B-4bit"
  lora:
    r: 16
    alpha: 32
    layers: 4
  schedule:
    max_steps: 2000
    learning_rate: 1.5e-4
  export:
    gguf: true
    quantize: "q4_k_m"

output:
  formats: ["mlx_adapters", "gguf_4bit"]
  ollama:
    tag: "hermetic:production"
```