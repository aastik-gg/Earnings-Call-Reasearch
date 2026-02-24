import { useState } from "react";
import { analyzeTranscript } from "./services/api";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSummary(null);

    if (!file && !textInput) {
      setError("Please upload a file or paste transcript text.");
      return;
    }

    setLoading(true);

    try {
      const data = await analyzeTranscript({
        file,
        transcriptText: textInput
      });

      setSummary(data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.message ||
        "Something went wrong."
      );
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <header>
        <h1>Earnings Call Research Tool</h1>
        <p className="subtitle">
          AI-powered structured analysis of earnings transcripts
        </p>
      </header>

      <div className="input-card">
        <label className="file-upload">
          Upload PDF or TXT
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {file && <p className="file-name">Selected: {file.name}</p>}

        <div className="divider">OR</div>

        <textarea
          placeholder="Paste transcript text here..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="primary-btn"
        >
          {loading ? "Analyzing..." : "Generate Summary"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {summary && (
        <div className="summary-grid">
          <Section title="Management Tone">
            <Badge text={summary.management_tone.classification} />
            <p>{summary.management_tone.justification}</p>
          </Section>

          <Section title="Confidence Level">
            <Badge text={summary.confidence_level} />
          </Section>

          <ListSection
            title="Key Positives"
            items={summary.key_positives}
          />

          <ListSection
            title="Key Concerns"
            items={summary.key_concerns}
          />

          <Section title="Forward Guidance">
            <p>
              <strong>Revenue:</strong>{" "}
              {summary.forward_guidance.revenue}
            </p>
            <p>
              <strong>Margin:</strong>{" "}
              {summary.forward_guidance.margin}
            </p>
            <p>
              <strong>Capex:</strong>{" "}
              {summary.forward_guidance.capex}
            </p>
          </Section>

          <Section title="Capacity Utilization">
            {summary.capacity_utilization_trends}
          </Section>

          <ListSection
            title="New Growth Initiatives"
            items={summary.new_growth_initiatives}
          />
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function ListSection({ title, items }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function Badge({ text }) {
  return <span className="badge">{text}</span>;
}

export default App;