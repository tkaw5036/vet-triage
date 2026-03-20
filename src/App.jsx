import { useState } from "react";
import "./App.css";
import { calculateTriage } from "./triageEngine";

export default function App() {
  const [form, setForm] = useState({
    // BASIS
    animal: "",
    ageGroup: "",
    weight: "",

    // 🔴 LEBENSBEDROHLICH
    unconscious: false,
    breathingProblem: false,
    seizureActive: false,
    majorBleeding: false,
    poisoning: false,
    collapse: false,

    // 🟠 AKUT
    trauma: false,
    vomiting: false,
    diarrhea: false,
    pain: false,
    bloatedAbdomen: false,
    catNoUrine: false,
    fever: false,

    // 🟡 ALLGEMEIN
    notEating: false,
    lethargy: false,
    drinkingChange: false,
    coughing: false,
    limping: false,

    // RISIKO
    puppyOrSenior: false,
    chronicDisease: false,
    medication: false,
  });

  function updateField(field) {
    setForm({
      ...form,
      [field]: !form[field],
    });
  }

  const result = calculateTriage(form);

  return (
    <div className="container">
      <h1>🐾 Vet-Triage Leitstelle</h1>

      {/* ================= BASIS ================= */}
      <h2>1. Tierart</h2>
      <select
        value={form.animal}
        onChange={(e) =>
          setForm({ ...form, animal: e.target.value })
        }
      >
        <option value="">Bitte wählen</option>
        <option>Hund</option>
        <option>Katze</option>
        <option>Pferd</option>
        <option>Nagetier</option>
        <option>Exot</option>
      </select>

      {/* ================= ROT ================= */}
      <h2>🔴 Lebensbedrohlich</h2>

      <label><input type="checkbox" checked={form.unconscious} onChange={() => updateField("unconscious")} /> Bewusstlos</label>
      <label><input type="checkbox" checked={form.breathingProblem} onChange={() => updateField("breathingProblem")} /> Atemprobleme</label>
      <label><input type="checkbox" checked={form.majorBleeding} onChange={() => updateField("majorBleeding")} /> Starke Blutung</label>
      <label><input type="checkbox" checked={form.seizureActive} onChange={() => updateField("seizureActive")} /> Aktiver Krampfanfall</label>
      <label><input type="checkbox" checked={form.poisoning} onChange={() => updateField("poisoning")} /> Vergiftungsverdacht</label>
      <label><input type="checkbox" checked={form.collapse} onChange={() => updateField("collapse")} /> Kollaps / Zusammenbruch</label>

      {/* ================= ORANGE ================= */}
      <h2>🟠 Akute Probleme</h2>

      <label><input type="checkbox" checked={form.trauma} onChange={() => updateField("trauma")} /> Unfall / Trauma</label>
      <label><input type="checkbox" checked={form.vomiting} onChange={() => updateField("vomiting")} /> Erbrechen</label>
      <label><input type="checkbox" checked={form.diarrhea} onChange={() => updateField("diarrhea")} /> Durchfall</label>
      <label><input type="checkbox" checked={form.pain} onChange={() => updateField("pain")} /> Schmerzen</label>
      <label><input type="checkbox" checked={form.bloatedAbdomen} onChange={() => updateField("bloatedAbdomen")} /> Aufgeblähter Bauch</label>
      <label><input type="checkbox" checked={form.catNoUrine} onChange={() => updateField("catNoUrine")} /> Katze setzt keinen Urin ab</label>

      {/* ================= GELB ================= */}
      <h2>🟡 Allgemeinzustand</h2>

      <label><input type="checkbox" checked={form.notEating} onChange={() => updateField("notEating")} /> Frisst nicht</label>
      <label><input type="checkbox" checked={form.lethargy} onChange={() => updateField("lethargy")} /> Apathisch / müde</label>
      <label><input type="checkbox" checked={form.coughing} onChange={() => updateField("coughing")} /> Husten</label>
      <label><input type="checkbox" checked={form.limping} onChange={() => updateField("limping")} /> Lahmheit</label>

      {/* ================= RISIKO ================= */}
      <h2>⚠️ Risikofaktoren</h2>

      <label><input type="checkbox" checked={form.puppyOrSenior} onChange={() => updateField("puppyOrSenior")} /> Jungtier / Senior</label>
      <label><input type="checkbox" checked={form.chronicDisease} onChange={() => updateField("chronicDisease")} /> Chronische Erkrankung</label>
      <label><input type="checkbox" checked={form.medication} onChange={() => updateField("medication")} /> Aktuelle Medikamente</label>

      {/* ================= ERGEBNIS ================= */}
      <h2>📊 Triage Ergebnis</h2>

      <div className={`result ${result.level}`}>
        <h3>{result.level}</h3>
        <p>{result.text}</p>
      </div>
    </div>
  );
}