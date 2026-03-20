import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    animal: "",
    ageGroup: "",
    weight: "",

    // 🔴 NOTFALL
    unconscious: false,
    breathingProblem: false,
    seizureActive: false,
    majorBleeding: false,
    poisoning: false,

    // 🟠 AKUT
    vomiting: false,
    diarrhea: false,
    pain: false,
    trauma: false,

    // 🟡 ALLGEMEIN
    notEating: false,
    lethargy: false,
    coughing: false,

    // DETAILFRAGEN
    vomitingFrequency: "",
    painLevel: "",
  });

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function next() {
    setStep((s) => s + 1);
  }

  function back() {
    setStep((s) => s - 1);
  }

  // =============================
  // TRIAGE ENGINE
  // =============================
  function calculateResult() {
    if (
      form.unconscious ||
      form.breathingProblem ||
      form.seizureActive ||
      form.majorBleeding ||
      form.poisoning
    ) {
      return {
        level: "🔴 NOTFALL",
        text: "Sofort Tierklinik aufsuchen!",
      };
    }

    if (form.trauma || form.pain || form.vomiting || form.diarrhea) {
      return {
        level: "🟠 DRINGEND",
        text: "Heute noch Tierarzt kontaktieren.",
      };
    }

    return {
      level: "🟢 BEOBACHTEN",
      text: "Weiter beobachten und Termin planen.",
    };
  }

  // =============================
  // UI KOMPONENTEN
  // =============================
  const Card = ({ children }) => (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 30,
        borderRadius: 16,
        background: "#ffffff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        fontFamily: "Arial",
      }}
    >
      {children}
    </div>
  );

  const Button = ({ children, onClick }) => (
    <button
      onClick={onClick}
      style={{
        padding: "12px 18px",
        marginTop: 20,
        marginRight: 10,
        borderRadius: 10,
        border: "none",
        background: "#2563eb",
        color: "white",
        cursor: "pointer",
        fontSize: 16,
      }}
    >
      {children}
    </button>
  );

  const Checkbox = ({ label, field }) => (
    <label style={{ display: "block", margin: "10px 0" }}>
      <input
        type="checkbox"
        checked={form[field]}
        onChange={(e) => updateField(field, e.target.checked)}
      />{" "}
      {label}
    </label>
  );

  // =============================
  // STEPS
  // =============================

  // STEP 0 — START
  if (step === 0)
    return (
      <Card>
        <h1>🐾 Vet Triage Assistant</h1>
        <p>Wir stellen einige Fragen zur Einschätzung.</p>
        <Button onClick={next}>Start</Button>
      </Card>
    );

  // STEP 1 — BASISDATEN
  if (step === 1)
    return (
      <Card>
        <h2>Basisinformationen</h2>

        <select
          value={form.animal}
          onChange={(e) => updateField("animal", e.target.value)}
        >
          <option value="">Tier wählen</option>
          <option>Hund</option>
          <option>Katze</option>
        </select>

        <br /><br />

        <select
          value={form.ageGroup}
          onChange={(e) => updateField("ageGroup", e.target.value)}
        >
          <option value="">Alter</option>
          <option>Welpe/Jungtier</option>
          <option>Erwachsen</option>
          <option>Senior</option>
        </select>

        <br />

        <Button onClick={next}>Weiter</Button>
      </Card>
    );

  // STEP 2 — NOTFALLFRAGEN
  if (step === 2)
    return (
      <Card>
        <h2>🚨 Notfall-Check</h2>

        <Checkbox label="Bewusstlos" field="unconscious" />
        <Checkbox label="Atemprobleme" field="breathingProblem" />
        <Checkbox label="Aktiver Krampfanfall" field="seizureActive" />
        <Checkbox label="Starke Blutung" field="majorBleeding" />
        <Checkbox label="Vergiftung möglich" field="poisoning" />

        <Button onClick={back}>Zurück</Button>
        <Button onClick={next}>Weiter</Button>
      </Card>
    );

  // STEP 3 — AKUTE SYMPTOME
  if (step === 3)
    return (
      <Card>
        <h2>Akute Symptome</h2>

        <Checkbox label="Erbrechen" field="vomiting" />
        <Checkbox label="Durchfall" field="diarrhea" />
        <Checkbox label="Schmerzen" field="pain" />
        <Checkbox label="Unfall / Trauma" field="trauma" />

        <Button onClick={back}>Zurück</Button>
        <Button onClick={next}>Weiter</Button>
      </Card>
    );

  // STEP 4 — DYNAMISCHE FOLGEFRAGEN
  if (step === 4)
    return (
      <Card>
        <h2>Weitere Details</h2>

        {form.vomiting && (
          <>
            <p>Wie häufig erbricht das Tier?</p>
            <select
              value={form.vomitingFrequency}
              onChange={(e) =>
                updateField("vomitingFrequency", e.target.value)
              }
            >
              <option value="">Auswählen</option>
              <option>1x</option>
              <option>Mehrmals</option>
              <option>Sehr häufig</option>
            </select>
          </>
        )}

        {form.pain && (
          <>
            <p>Wie stark wirken die Schmerzen?</p>
            <select
              value={form.painLevel}
              onChange={(e) => updateField("painLevel", e.target.value)}
            >
              <option value="">Auswählen</option>
              <option>Leicht</option>
              <option>Mittel</option>
              <option>Stark</option>
            </select>
          </>
        )}

        {!form.vomiting && !form.pain && (
          <p>Keine Zusatzfragen notwendig.</p>
        )}

        <Button onClick={back}>Zurück</Button>
        <Button onClick={next}>Auswertung</Button>
      </Card>
    );

  // STEP 5 — RESULTAT
  if (step === 5) {
    const result = calculateResult();

    return (
      <Card>
        <h2>Ergebnis</h2>
        <h1>{result.level}</h1>
        <p>{result.text}</p>

        <Button onClick={() => setStep(0)}>Neu starten</Button>
      </Card>
    );
  }
}