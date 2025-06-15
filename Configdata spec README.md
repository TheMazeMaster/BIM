// BIM Masterwheel — Full Configuration & Logic Specification

/**
 * GLOBAL LOGIC OVERVIEW
 */
const globalDivisionCount = 132; // The full 360° wheel is divided into 132 equal radial segments

/**
 * TIER CONTROL SYSTEM
 * Each tier (T0 - T6) is defined by a config object. 
 * Only outerRadius is set per tier; innerRadius is inferred from the previous tier.
 */
const tiers = [
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

  // T1 - T6 remain as before, to be updated next...
];

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
