// wheelData.js

export const wheelData = {
  // T0 must have 1 element: the “Flow” label
  T0: ["Flow"],

  // T1 must have 1 element: the “Drive/Desire” text
  // You can change it, or leave blank like [""] if you want only a blank ring.
  T1: ["Drive / Desire"],

  // T2 must have 1 element: the “Purpose / Goal” text
  T2: ["Purpose / Goal"],

  // T3: exactly 3 labels, in the order you want them to appear around the ring
  T3: ["Fight", "Flight", "Freeze"],

  // T4: exactly 12 labels total (3 instincts × 4 categories each)
  // e.g. under “Fight” we have “Aggression,” “Confrontation,” etc.
  T4: [
    /* Fight’s 4 categories */
    "Aggression",
    "Confrontation",
    "Dominance",
    "Defensiveness",
    /* Flight’s 4 categories */
    "Hesitant Escape",
    "Overwhelmed Avoidance",
    "Shutdown",
    "Dissociation",
    /* Freeze’s 4 categories */
    "Compliance",
    "People-Pleasing",
    "Appeasement",
    "Over-Attachment"
  ],

  // T5: exactly 48 labels (12 categories × 4 modifiers each: Light/Mid/High/Intense)
  // If you don’t yet want text, you can fill with 48 empty strings: Array(48).fill("")
  T5: [
    /* Aggression → “Light Aggression”, “Mid Aggression”, etc. */
    "Light Aggression",
    "Mid Aggression",
    "High Aggression",
    "Intense Aggression",
    /* Confrontation → ... */
    "Light Confrontation",
    "Mid Confrontation",
    "High Confrontation",
    "Intense Confrontation",
    /* Dominance → ... */
    "Light Dominance",
    "Mid Dominance",
    "High Dominance",
    "Intense Dominance",
    /* Defensiveness → ... */
    "Light Defensiveness",
    "Mid Defensiveness",
    "High Defensiveness",
    "Intense Defensiveness",
    /* Hesitant Escape → ... */
    "Light Hesitant Escape",
    "Mid Hesitant Escape",
    "High Hesitant Escape",
    "Intense Hesitant Escape",
    /* Overwhelmed Avoidance → ... */
    "Light Overwhelmed Avoidance",
    "Mid Overwhelmed Avoidance",
    "High Overwhelmed Avoidance",
    "Intense Overwhelmed Avoidance",
    /* Shutdown → ... */
    "Light Shutdown",
    "Mid Shutdown",
    "High Shutdown",
    "Intense Shutdown",
    /* Dissociation → ... */
    "Light Dissociation",
    "Mid Dissociation",
    "High Dissociation",
    "Intense Dissociation",
    /* Compliance → ... */
    "Light Compliance",
    "Mid Compliance",
    "High Compliance",
    "Intense Compliance",
    /* People-Pleasing → ... */
    "Light People-Pleasing",
    "Mid People-Pleasing",
    "High People-Pleasing",
    "Intense People-Pleasing",
    /* Appeasement → ... */
    "Light Appeasement",
    "Mid Appeasement",
    "High Appeasement",
    "Intense Appeasement",
    /* Over-Attachment → ... */
    "Light Over-Attachment",
    "Mid Over-Attachment",
    "High Over-Attachment",
    "Intense Over-Attachment"
  ],

  // T6: exactly 192 labels (48 cells × 4 quotes each). If still working, use ["", "", ...].
  // When you’re ready, fill with 192 actual quotes.
  T6: Array(192).fill("")
};

  