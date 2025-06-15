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
    labelList: [ 
      "Aggression", "Confrontation", "Dominance", "Defensiveness", "Retaliation",
    "Reactive Evasion", "Chaotic Engagement", "Defensive Provocation",
    "Withdrawal", "Avoidance", "Evasion",
    "Anxious Withdrawal", "Hesitant Escape", "Overwhelmed Avoidance",
    "Shutdown", "Dissociation", "Immobilization",
    "Compliant Dissociation", "Passive Appeasement", "Fearful Merging",
    "Compliance", "People-Pleasing", "Appeasement",
    "Over-Attached Caretaking", "Sacrificial Bonding", "Hyper-Social Seeking",
    "Nurturing", "Bond-Building", "Support",
    "Protective Nurturing", "Boundary Enforcing Care", "Assertive Support", "Assertive Care / Directive Help"
     ],
    labelStyle: {
      type: "radial",
      fontSize: 6,
      fontWeight: "normal",
      anchor: "middle",
      verticalAlign: "middle"
    },
    fill: {
      mode: "gradient-manual",
      gradientPairs: [
       ["#e53935", "#ff7043"], ["#d81b60", "#f06292"], ["#8e24aa", "#ce93d8"],
       ["#5e35b1", "#b39ddb"], ["#3949ab", "#7986cb"], ["#1e88e5", "#64b5f6"],
       ["#039be5", "#4fc3f7"], ["#00acc1", "#4dd0e1"], ["#00897b", "#4db6ac"],
       ["#43a047", "#81c784"], ["#7cb342", "#c5e1a5"], ["#c0ca33", "#e6ee9c"],
       ["#fdd835", "#fff176"], ["#ffb300", "#ffe082"], ["#fb8c00", "#ffcc80"],
       ["#f4511e", "#ffab91"], ["#6d4c41", "#a1887f"], ["#757575", "#e0e0e0"],
       ["#546e7a", "#90a4ae"], ["#d32f2f", "#ef5350"], ["#c2185b", "#f48fb1"],
       ["#7b1fa2", "#ba68c8"], ["#512da8", "#9575cd"], ["#303f9f", "#7986cb"],
       ["#1976d2", "#64b5f6"], ["#0288d1", "#4fc3f7"], ["#0097a7", "#4dd0e1"],
       ["#00796b", "#4db6ac"], ["#388e3c", "#81c784"], ["#689f38", "#aed581"],
       ["#afb42b", "#dce775"], ["#fbc02d", "#fff176"], ["#ffa000", "#ffb74d"]
    ]
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
