// === MAIN.JS: BIM MASTERWHEEL RENDER ENGINE ===

import { wheelConfig } from './config.js';
import { wheelData } from './wheelData.js';

const svg = document.getElementById('dim-wheel');
let currentRotation = 0;

// === RENDER ENTRY POINT ===
function renderWheel() {
  svg.innerHTML = ''; // Clear canvas
  const centerX = wheelConfig.centerX;
  const centerY = wheelConfig.centerY;

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  svg.appendChild(defs);

  for (let i = 0; i < wheelConfig.tiers.length; i++) {
    const tier = wheelConfig.tiers[i];
    if (tier.labelListSource) {
      tier.labelList = wheelData[tier.labelListSource];
    }
    drawTier(svg, tier, i, centerX, centerY, currentRotation, defs);
  }

  // Draw any global overlays after tiers
  if (Array.isArray(wheelConfig.overlays)) {
    drawOverlays(svg, wheelConfig.overlays, centerX, centerY, defs);
  }

  // Draw any global overlays after tiers
  if (Array.isArray(wheelConfig.overlays)) {
    drawOverlays(svg, wheelConfig.overlays, centerX, centerY, defs);
  }
}

// === ROTATION BUTTONS ===
function setupRotationButtons() {
  document.querySelectorAll('[data-rotate]').forEach(btn => {
    const value = parseInt(btn.getAttribute('data-rotate'), 10);
    if (!isNaN(value)) {
      btn.addEventListener('click', () => {
        currentRotation = (currentRotation + value + wheelConfig.globalDivisionCount) % wheelConfig.globalDivisionCount;
        renderWheel();
      });
    }
  });
}

// === T6 DATASET SWITCHING ===
function setupT6Buttons() {
  document.querySelectorAll('[data-t6]').forEach(button => {
    const source = button.getAttribute('data-t6');
    if (source) {
      button.addEventListener('click', () => {
        wheelConfig.tiers[6].labelListSource = source;
        renderWheel();
      });
    }
  });
}

// === TIER RENDERING FUNCTIONS ===
// === TIER RENDERING FUNCTIONS ===
function drawTier(svg, tierConfig, tierIndex, cx, cy, rotationOffset, defs) {
  // 1) Respect the 'visible' flag (instead of the old 'show')
  if (!tierConfig.visible) return;

  // 2) Figure out which label style to use
  const styleType = tierConfig.labelStyle?.type || 'radial';

  // 3a) Centered text (T0)
  if (styleType === 'centered') {
    drawCenteredText(svg, tierConfig, cx, cy);
  }
  // 3b) Arc text (T1 & T2)
  else if (styleType === 'arcText') {
    drawArcText(svg, tierConfig, cx, cy);
  }
  // 3c) Radial slices (T3–T6)
  else {
    drawRadialTier(svg, tierConfig, tierIndex, cx, cy, rotationOffset, defs);
  }
}


function drawCenteredText(svg, config, cx, cy) {
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', cx);
  text.setAttribute('y', cy);
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('alignment-baseline', 'middle');
  text.setAttribute('font-size', config.labelStyle.fontSize || 16);
  text.setAttribute('font-weight', config.labelStyle.fontWeight || 'normal');
  text.setAttribute('fill', config.labelStyle.color || '#000');
  text.textContent = config.label;
  svg.appendChild(text);
}

function drawArcText(svg, config, cx, cy) {
  const radius = (config.outerRadius + config.innerRadius) / 2 + (config.radiusOffset || 0);
  const pathId = `arcPath-${Math.random().toString(36).substr(2, 9)}`;

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const startAngle = 0;
  // Use an end angle slightly less than 360° so the arc has a non-zero length
  // when start and end points coincide.
  const endAngle = startAngle + 359.9;
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);

  const d = [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArc, 0, end.x, end.y
  ].join(' ');

  path.setAttribute('id', pathId);
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none');
  svg.appendChild(path);

  const textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
  textPath.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${pathId}`);
  textPath.setAttribute('startOffset', '50%');
  textPath.setAttribute('text-anchor', 'middle');
  textPath.setAttribute('font-size', config.labelStyle.fontSize || 16);
  textPath.setAttribute('font-weight', config.labelStyle.fontWeight || 'normal');
  textPath.setAttribute('fill', config.labelStyle.color || '#000');
  textPath.textContent = config.label;

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.appendChild(textPath);
  svg.appendChild(text);
}

function drawRadialTier(svg, config, tierIndex, cx, cy, rotationOffset, defs) {
  const count = config.divisionWeights.length;
  const full = wheelConfig.globalDivisionCount;
  let currentAngle = (rotationOffset * 360) / full;

  for (let i = 0; i < count; i++) {
    const weight = config.divisionWeights[i];
    const angle = (weight / full) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const inner = config.innerRadius;
    const outer = config.outerRadius;

    const p1 = polarToCartesian(cx, cy, outer, startAngle);
    const p2 = polarToCartesian(cx, cy, outer, endAngle);
    const p3 = polarToCartesian(cx, cy, inner, endAngle);
    const p4 = polarToCartesian(cx, cy, inner, startAngle);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    const d = [
      'M', p1.x, p1.y,
      'A', outer, outer, 0, largeArc, 1, p2.x, p2.y,
      'L', p3.x, p3.y,
      'A', inner, inner, 0, largeArc, 0, p4.x, p4.y,
      'Z'
    ].join(' ');

    path.setAttribute('d', d);

    let segmentFill = '#ccc';
    if (config.fill?.mode === 'manual') {
      segmentFill = config.fill.colorList?.[i] || segmentFill;
    } else if (config.fill?.mode === 'gradient-manual') {
      const pair = config.fill.gradientPairs?.[i];
      if (pair && defs) {
        const gradId = `grad-${tierIndex}-${i}`;
        const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        grad.setAttribute('id', gradId);
        grad.setAttribute('x1', '0%');
        grad.setAttribute('y1', '0%');
        grad.setAttribute('x2', '0%');
        grad.setAttribute('y2', '100%');
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', pair[0]);
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', pair[1]);
        grad.appendChild(stop1);
        grad.appendChild(stop2);
        defs.appendChild(grad);
        segmentFill = `url(#${gradId})`;
      }
    } else if (config.fill?.colors?.[i]) {
      segmentFill = config.fill.colors[i];
    }
    path.setAttribute('fill', segmentFill);
    path.setAttribute('stroke', config.stroke?.show ? '#000' : 'none');
    path.setAttribute('stroke-width', config.stroke?.normal || 0.25);

    svg.appendChild(path);

    // Optional label (centered along arc)
    if (config.labelList) {
      const midAngle = (startAngle + endAngle) / 2;
      const r = (inner + outer) / 2;
      const labelPos = polarToCartesian(cx, cy, r + (config.labelStyle.offset || 0), midAngle);
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', labelPos.x);
      text.setAttribute('y', labelPos.y);
      text.setAttribute('font-size', config.labelStyle.fontSize || 12);
      text.setAttribute('fill', config.labelStyle.color || '#000');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('alignment-baseline', 'middle');
      text.setAttribute('transform', `rotate(${midAngle}, ${labelPos.x}, ${labelPos.y})`);
      text.textContent = config.labelList[i] || '';
      svg.appendChild(text);
    }
  }
}

function drawOverlays(svg, overlays, cx, cy, defs) {
  overlays.forEach((ov, idx) => {
    if (ov.type === 'radialGradient') {
      const gradId = `ov-grad-${idx}`;
      const grad = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
      grad.setAttribute('id', gradId);
      grad.setAttribute('cx', cx);
      grad.setAttribute('cy', cy);
      grad.setAttribute('r', ov.radiusRange[1]);
      grad.setAttribute('gradientUnits', 'userSpaceOnUse');

      const startOffset = (ov.radiusRange[0] / ov.radiusRange[1]) * 100;

      const stop0 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop0.setAttribute('offset', '0%');
      stop0.setAttribute('stop-color', ov.from);

      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop1.setAttribute('offset', `${startOffset}%`);
      stop1.setAttribute('stop-color', ov.from);

      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', ov.to);

      grad.appendChild(stop0);
      grad.appendChild(stop1);
      grad.appendChild(stop2);
      defs.appendChild(grad);

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', ringPath(cx, cy, ov.radiusRange[0], ov.radiusRange[1]));
      path.setAttribute('fill', `url(#${gradId})`);
      path.setAttribute('pointer-events', 'none');
      svg.appendChild(path);
    }
  });
}

function ringPath(cx, cy, inner, outer) {
  const startAngle = 0;
  const endAngle = 359.9;
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const p1 = polarToCartesian(cx, cy, outer, startAngle);
  const p2 = polarToCartesian(cx, cy, outer, endAngle);
  const p3 = polarToCartesian(cx, cy, inner, endAngle);
  const p4 = polarToCartesian(cx, cy, inner, startAngle);
  return [
    'M', p1.x, p1.y,
    'A', outer, outer, 0, largeArc, 1, p2.x, p2.y,
    'L', p3.x, p3.y,
    'A', inner, inner, 0, largeArc, 0, p4.x, p4.y,
    'Z'
  ].join(' ');
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = (angleDeg - 90) * Math.PI / 180.0;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad)
  };
}

// === INIT ===
setupRotationButtons();
setupT6Buttons();
renderWheel();
