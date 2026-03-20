export function calculateTriage(form) {

  // 🔴 SOFORT NOTFALL
  if (
    form.unconscious ||
    form.breathingProblem ||
    form.majorBleeding ||
    form.seizureActive ||
    form.poisoning
  ) {
    return {
      level: "ROT",
      text: "SOFORT NOTFALL – sofort Tierarzt oder Klinik!"
    };
  }

  // 🟠 DRINGEND
  if (
    form.trauma ||
    form.vomiting ||
    form.diarrhea ||
    form.pain ||
    form.catNoUrine
  ) {
    return {
      level: "GELB",
      text: "Dringend – heute tierärztlich vorstellen."
    };
  }

  // 🟢 ROUTINE
  return {
    level: "GRÜN",
    text: "Kein akuter Notfall – Termin vereinbaren."
  };
}