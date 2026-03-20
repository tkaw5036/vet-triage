import { useState } from "react";
import "./App.css";

export default function App() {
  const [animal, setAnimal] = useState("");
  const [breathing, setBreathing] = useState(false);
  const [bleeding, setBleeding] = useState(false);
  const [unconscious, setUnconscious] = useState(false);

  function calculateTriage() {
    if (unconscious || breathing || bleeding) {
      return { level: "ROT", text: "SOFORT NOTFALL – Tierarzt sofort!" };
    }
    if (animal !== "") {
      return { level: "GELB", text: "Dringend – heute vorstellen." };
    }
    return { level: "GRÜN", text: "Routinefall." };
  }

  const result = calculateTriage();

  return (
    <div className="container">
      <h1>🐾 Vet-Triage Leitstelle</h1>

      <h2>1. Tierart</h2>
      <select onChange={(e) => setAnimal(e.target.value)}>
        <option value="">Bitte wählen</option>
        <option>Hund</option>
        <option>Katze</option>
        <option>Pferd</option>
        <option>Nagetier</option>
        <option>Exot</option>
      </select>

      <h2>2. Notfallfragen</h2>

      <label>
        <input
          type="checkbox"
          onChange={(e) => setBreathing(e.target.checked)}
        />
        Atemprobleme?
      </label>

      <label>
        <input
          type="checkbox"
          onChange={(e) => setBleeding(e.target.checked)}
        />
        Starke Blutung?
      </label>

      <label>
        <input
          type="checkbox"
          onChange={(e) => setUnconscious(e.target.checked)}
        />
        Bewusstlos?
      </label>

      <h2>3. Triage Ergebnis</h2>

      <div className={`result ${result.level}`}>
        <h3>{result.level}</h3>
        <p>{result.text}</p>
      </div>
    </div>
  );
}