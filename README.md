BIM Masterwheel – Master Build Specification (Written Outline)

🧭 Overview

The BIM Masterwheel is a fully modular, data-driven SVG visualization tool representing layered human instincts, behaviors, modifiers, and expressions across 7 concentric tiers (T0–T6). It emphasizes full user control, pixel-level alignment, and a clean separation of data, logic, and rendering. All values are explicitly declared; the engine performs no auto-inference.

🧱 Wheel Architecture

7 Tiers: T0 through T6, drawn center-out

globalDivisionCount: 132 (locked)

Rendering Order: T0 → T6

Draw Logic: Center-out, non-overlapping SVG segments

Rotation: Optional; user-controlled with multiple step options

🔧 Global Config Controls

globalDivisionCount: Total radial slices (132)

rotationStep: Defines snap angle per rotate button (based on 132 divisions)

rotationButtons: Configurable step list, e.g. -20, -3, +3, +20

debugRenderOutlines: Enables outline/stroke rendering for debug

debugGuides: Enables internal radial guides for dev use

strokeDefaults: Defines normal and wide line width globally

fontDefaults: Base font family and styling defaults

colors.js: External color definitions for easy adjustment

🎨 Color System

T3: Manual 10-color list (one per instinct block)

T4: 33 gradient pairs, defined via start/end hex codes

T5: mode: inherit from T4, with overlay: shade

T6: mode: inherit from T5, with overlay: tint

Transparent color: #00000000 or rgba(0,0,0,0)

All colors declared in separate file for easy swapping

🔁 Label and Font Logic

All tiers use a labelStyle config object

Supports centered (T0) and arcText or radial (T1–T6)

Font controls per tier: fontSize, fontWeight, anchor, verticalAlign

radiusOffset: Manual tweak value to fix arcText misalignment

All labels can be toggled with showLabels

🛠️ Stroke / Line Controls

Per-tier stroke object:

show: Toggles line rendering

normal, wide: Thickness settings

every: Applies wide stroke every N divisions

includeFirst: Ensures first line is always drawn

No stroke logic is inferred — full visual control

🎛️ Fill Modes

solid: Flat fill

gradient-global: Gradient across full ring

gradient-manual: One gradient per segment (T4 style)

manual: Per-segment color list (T3)

inherit: Uses prior tier’s color at same index (T5, T6)

🧩 Division Logic

divisionWeights[]: Every tier from T3–T6 uses manual arrays

T3 = 10 weighted instincts (summing to 132)

T4 = 33 behaviors × 4 divisions = 132

T5/T6 = 132 divisions

No calculations are auto-derived — all index math is hard-defined

🧠 Data Sources

labelList: Local list of strings or generated (e.g. T5 modifiers)

labelListSource: Used in T6 to dynamically switch datasets

availableSources: ["quotes", "emotion", "tone", "behavior", "thriveCounter"]

Data is modular — content can be swapped by toggling source

🧪 T6 Data Switching

T6 label set is dynamic

Button-style UI options allow live toggling between datasets

Entire dataset is pulled via labelListSource key

Each T6 state maps 1:1 with existing 132 segment structure

🔄 Rotation Modes

Rotation is optional, included in MVP

Rotation step values can be any integer from 1 to 132

Suggested default: -20, -3, +3, +20

All tiers (except T0–T2) rotate together

T0–T2 have rotationLocked: true

🖼️ Overlays

T4–T6 can include visual overlays via overlay block

Types: tint, shade

Applied per-tier (not global)

Optional radial overlay for global gradient (post-MVP)

✅ MVP Summary

Fully functioning 7-tier wheel

All tier configurations modular and isolated

Stroke + fill + label + font fully customizable per tier

Rotation logic clear and flexible

Data sources external and switchable

Overlay and color layers locked in for T4–T6

This document is the ground truth blueprint. Feed this to any AI code engine, and it will have zero ambiguity.

Next steps: None. System complete. Ready to build.

