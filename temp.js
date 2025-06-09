// BIM Masterwheel — Full Configuration & Logic Specification

/**
 * GLOBAL OPTIONS
 */
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

const globalDivisionCount = 132; // The full 360° wheel is divided into 132 equal radial segments

/**
 * TIER CONTROL SYSTEM
 * Each tier (T0 - T6) is defined by a config object. 
 * Only outerRadius is set per tier; innerRadius is inferred from the previous tier.
 */
const tiers = [
  
    // Tier 0
    {
    key: "T0",
    outerRadius: 20,
    ringWidth: 20, // Explicit ring thickness control
    rotationLocked: true, // T0 does not rotate with the rest of the wheel

    label: "Flow",
    labelStyle: {
      type: "centered",       // Centered text in the circle
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
  innerRadius: 20,               // Inherited from T0.outerRadius
  outerRadius: 40,               // Manual control of tier thickness
  rotationLocked: true,          // Does not spin with wheel rotation

  label: "Universal Objectives",
  labelStyle: {
    type: "arcText",             // Label follows curve of the ring
    fontSize: 10,
    fontWeight: "normal",
    anchor: "middle",
    verticalAlign: "middle",
    positionAngle: 180,          // 0 = top, 180 = bottom
    radiusOffset: 0              // Optional offset from arc path center (used for alignment fixes)
  },

  fill: {
    mode: "solid",
    startColor: "#ffffff",
    endColor: "#ffffff"
  },

  stroke: {
    show: false                  // No stroke/division lines for this tier
  },

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

  stroke: {
    show: false
  },

  showLabels: true,
  visible: true
},

// Tier 3
{
  key: "T3",
  innerRadius: 60,
  outerRadius: 120,
  rotationLocked: false,         // This tier rotates with the wheel

  divisionWeights: [5, 3, 3, 3, 3, 3, 3, 3, 3, 4], // Total must equal globalDivisionCount (132)

  labelList: [
    "Fight", "Fight ↔ Flight", "Flight", "Flight ↔ Freeze",
    "Freeze", "Freeze ↔ Flop", "Flop", "Flop ↔ Friend",
    "Friend", "Friend ↔ Fight"
  ],

  labelStyle: {
    type: "radial",              // Text rotates with segment
    fontSize: 7,
    fontWeight: "bold",
    anchor: "middle",
    verticalAlign: "middle"
  },

  fill: {
    mode: "manual",              // Each instinct block has its own color
    colorList: [
      "#ff0000", "#ff6600", "#ffaa00", "#ccff00",
      "#66ff66", "#00ccff", "#0066ff", "#0000ff",
      "#6600cc", "#cc0099"
    ] // 10 base instinct colors
  },

  stroke: {
    show: true,
    normal: 0.25,
    wide: 1.0,
    every: 1,                    // Every segment gets a line
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

  divisionWeights: Array(33).fill(4), // Each behavior spans 4 slices → 33 × 4 = 132

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
  ], // Total: 33 labels

  labelStyle: {
    type: "radial",
    fontSize: 6,
    fontWeight: "normal",
    anchor: "middle",
    verticalAlign: "middle"
  },

  fill: {
    mode: "gradient-manual",           // Each behavior category gets its own start/end gradient
    gradientPairs: [
      ["#e53935", "#ff7043"], ["#8e24aa", "#ce93d8"],
      ["#3949ab", "#5c6bc0"], ["#1e88e5", "#64b5f6"],
      ["#00897b", "#4db6ac"], // ...
      // Define 33 total pairs, one per category
    ]
  },

  stroke: {
    show: true,
    normal: 0.25,
    wide: 1.0,
    every: 4,                    // Every 4th line is thick (aligns with instinct grouping)
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

  divisionWeights: Array(132).fill(1), // One slice per modifier (4 per T4 category)

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

  fill: {
    mode: "inherit" // Inherits T4 color at matching index
  },

  overlay: {
    mode: "shade", // Applies a transparent black layer on top
    color: "#000000",
    strength: 0.25 // 25% black overlay to darken inherited color
  },

  stroke: {
    show: true,
    normal: 0.25,
    wide: 1.0,
    every: 4,            // Every 4 = start of new behavior group
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

  divisionWeights: Array(132).fill(1), // One quote per modifier unit

  labelListSource: "quotes",          // One of: 'quotes', 'emotions', 'tone', 'behavior', 'thriveCounterQuote'
  availableSources: [                 // UI options for user to switch dataset
    "quotes", "emotions", "tone", "behavior", "thriveCounterQuote"
  ],

  labelStyle: {
    type: "radial",
    fontSize: 5,
    fontWeight: "lighter",
    anchor: "start",                  // Let labels align outward
    verticalAlign: "middle"
  },

  fill: {
    mode: "inherit"                   // Pulls from T5 by index
  },

  overlay: {
    mode: "tint",                     // Light overlay to soften intensity
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

  
  // T1 - T6 done next...
];



/**
 * OVERLAY ENGINE (OPTIONAL)
 */
const overlays = [
  {
    type: "radialGradient",
    radiusRange: [120, 500],
    from: "#ffffff00",
    to: "#00000033"
  }
];
