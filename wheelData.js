// === wheelData.js — BIM Masterwheel Data ===

import quotes from './quotes.js';
import emotions from './emotion.js';
import tone from './tone.js';
import behavior from './behavior.js';
import thriveCounterQuote from './thriveCounter.js';

export const wheelData = {
  // T0–T2: Single labels
  T0: ["Flow"],
  T1: ["Drive / Desire"],
  T2: ["Purpose / Goal"],

  // T3: Instincts (must match weights in config)
  T3: ["Fight", "Fight ↔ Flight", "Flight", "Flight ↔ Freeze",
      "Freeze", "Freeze ↔ Flop", "Flop", "Flop ↔ Friend",
      "Friend", "Friend ↔ Fight"],

  // T4: 33 behavior categories (one per segment group)
  T4: [
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

  // T5: Modifier phrases
  T5: (() => {
    const mods = ["Light", "Mid", "High", "Intense"];
    const cats = [
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
    ];
    return cats.flatMap(c => mods.map(m => `${m} ${c}`));
  })(),

  // T6 variants
  quotes,
  emotions,
  tone,
  behavior,
  thriveCounterQuote
};
