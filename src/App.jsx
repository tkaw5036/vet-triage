import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState("");

  const questions = [
    {
      q: "Ist das Tier bewusstlos oder reagiert nicht?",
      yes: "🔴 SOFORT NOTFALLKLINIK",
      no: null,
    },
    {
      q: "Hat das Tier Atemprobleme?",
      yes: "🔴 SOFORT NOTFALLKLINIK",
      no: null,
    },
    {
      q: "Starke Blutung sichtbar?",
      yes: "🔴 SOFORT NOTFALLKLINIK",
      no: null,
    },
    {
      q: "Erbricht oder hat Durchfall, aber ist wach?",
      yes: "🟠 Heute Tierarzt kontaktieren",
      no: "🟢 Beobachten und Termin planen",
    },
  ];

  function answer(type) {
    const current = questions[step];

    if (current[type]) {
      setResult(current[type]);
    } else {
      setStep(step + 1);
    }
  }

  if (result) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Vet-Notfall-Triage</h1>
        <h2>{result}</h2>
        <button
          onClick={() => {
            setStep(0);
            setResult("");
          }}
        >
          Neustart
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Vet-Notfall-Triage</h1>
      <h2>{questions[step].q}</h2>

      <button onClick={() => answer("yes")}>Ja</button>
      <button onClick={() => answer("no")}>Nein</button>
    </div>
  );
}