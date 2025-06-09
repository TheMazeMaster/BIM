// BIM Masterwheel — Full Configuration & Logic Specification

const globalDivisionCount = 132;

const renderOptions = {
  rotationStep: 30,
  rotationEnabled: true,
  debugGuides: false,
  debugRenderOutlines: true,
  strokeDefaults: {
    normal: 0.25,
    wide: 1.0
  },
  fontDefaults: {
    fontFamily: "sans-serif"
  }
};

/**
 * TIER CONTROL SYSTEM (T0 – T6)
 * Each tier defines radius, divisions, labels, styles, fill, and stroke logic.
 */
const tiers = [
  // Tier 0
  {
    key: "T0",
    outerRadius: 20,
    ringWidth: 20,
    rotationLocked: true,
    label: "Flow",
    labelStyle: {
      type: "centered",
      fontSize: 12,
      fontWeight: "bold",
      anchor: "middle",
      verticalAlign: "middle"
    },
    fill: {
      mode: "solid",
      startColor: "#ffffff",
      endColor: "#ffffff"
    },
    stroke: {
      show: true,
      width: 1.0,
      color: "#000000"
    },
    showLabels: true,
    visible: true
  },
  // Tier 1
  {
    key: "T1",
    innerRadius: 20,
    outerRadius: 40,
    rotationLocked: true,
    label: "Universal Objectives",
    labelStyle: {
      type: "arcText",
      fontSize: 10,
      fontWeight: "normal",
      anchor: "middle",
      verticalAlign: "middle",
      positionAngle: 180,
      radiusOffset: 0
    },
    fill: {
      mode: "solid",
      startColor: "#ffffff",
      endColor: "#ffffff"
    },
    stroke: { show: false },
    showLabels: true,
    visible: true
  },
  // Tier 2
  {
    key: "T2",
    innerRadius: 40,
    outerRadius: 60,
    rotationLocked: true,
    label: "Lens of Experience",
    labelStyle: {
      type: "arcText",
      fontSize: 10,
      fontWeight: "normal",
      anchor: "middle",
      verticalAlign: "middle",
      positionAngle: 180,
      radiusOffset: 0
    },
    fill: {
      mode: "solid",
      startColor: "#ffffff",
      endColor: "#ffffff"
    },
    stroke: { show: false },
    showLabels: true,
    visible: true
  },
  // Tier 3
  {
    key: "T3",
    innerRadius: 60,
    outerRadius: 120,
    rotationLocked: false,
    divisionWeights: [5, 3, 3, 3, 3, 3, 3, 3, 3, 4],
    labelList: [
      "Fight", "Fight ↔ Flight", "Flight", "Flight ↔ Freeze",
      "Freeze", "Freeze ↔ Flop", "Flop", "Flop ↔ Friend",
      "Friend", "Friend ↔ Fight"
    ],
    labelStyle: {
      type: "radial",
      fontSize: 7,
      fontWeight: "bold",
      anchor: "middle",
      verticalAlign: "middle"
    },
    fill: {
      mode: "manual",
      colorList: [
        "#ff0000", "#ff6600", "#ffaa00", "#ccff00",
        "#66ff66", "#00ccff", "#0066ff", "#0000ff",
        "#6600cc", "#cc0099"
      ]
    },
    stroke: {
      show: true,
      normal: 0.25,
      wide: 1.0,
      every: 1,
      includeFirst: true
    },
    showLabels: true,
    visible: true
  },
  // Tier 4
  {
    key: "T4",
    innerRadius: 120,
    outerRadius: 220,
    rotationLocked: false,
    divisionWeights: Array(33).fill(4),
    labelList: [ /* 33 labels here... */ ],
    labelStyle: {
      type: "radial",
      fontSize: 6,
      fontWeight: "normal",
      anchor: "middle",
      verticalAlign: "middle"
    },
    fill: {
      mode: "gradient-manual",
      gradientPairs: [ /* 33 color pairs here... */ ]
    },
    stroke: {
      show: true,
      normal: 0.25,
      wide: 1.0,
      every: 4,
      includeFirst: true
    },
    showLabels: true,
    visible: true
  },
  // Tier 5
  {
    key: "T5",
    innerRadius: 220,
    outerRadius: 250,
    rotationLocked: false,
    divisionWeights: Array(132).fill(1),
    labelList: (() => {
      const mods = ["Light", "Mid", "High", "Intense"];
      return Array(33).flatMap(() => mods);
    })(),
    labelStyle: {
      type: "radial",
      fontSize: 5,
      fontWeight: "normal",
      anchor: "middle",
      verticalAlign: "middle"
    },
    fill: { mode: "inherit" },
    overlay: {
      mode: "shade",
      color: "#000000",
      strength: 0.25
    },
    stroke: {
      show: true,
      normal: 0.25,
      wide: 1.0,
      every: 4,
      includeFirst: true
    },
    showLabels: true,
    visible: true
  },
  // Tier 6
  {
    key: "T6",
    innerRadius: 250,
    outerRadius: 500,
    rotationLocked: false,
    divisionWeights: Array(132).fill(1),
    labelListSource: "quotes",
    availableSources: ["quotes", "emotions", "tone", "behavior", "thriveCounterQuote"],
    labelStyle: {
      type: "radial",
      fontSize: 5,
      fontWeight: "lighter",
      anchor: "start",
      verticalAlign: "middle"
    },
    fill: { mode: "inherit" },
    overlay: {
      mode: "tint",
      color: "#ffffff",
      strength: 0.15
    },
    stroke: {
      show: true,
      normal: 0.25,
      wide: 1.0,
      every: 4,
      includeFirst: true
    },
    showLabels: true,
    visible: true
  }
];

/**
 * OVERLAYS (Optional)
 */
const overlays = [
  {
    type: "radialGradient",
    radiusRange: [120, 500],
    from: "#ffffff00",
    to: "#00000033"
  }
];

/**
 * EXPORT FULL CONFIG
 */
export const wheelConfig = {
  centerX: 500,
  centerY: 500,
  globalDivisionCount,
  renderOptions,
  tiers,
  overlays,
  availableSources: ["quotes", "emotions", "tone", "behavior", "thriveCounterQuote"]
};
