const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


function cleanJSONResponse(text) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}


async function generateSummary(fullTranscriptText) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"  
  });

  const trimmedText = fullTranscriptText.slice(0, 20000);

  const prompt = `
You are an equity research analyst.

Analyze the earnings call transcript below and generate a structured research summary.

Rules:
- Use ONLY information explicitly present in the transcript.
- Do NOT hallucinate.
- If something is not mentioned, return "Not disclosed in transcript".
- Be analytical but concise.
- Each text field should be maximum 120 words.
- Return JSON ONLY (no explanations, no markdown).

Return JSON in this exact format:

{
  "management_tone": {
    "classification": "Optimistic | Cautious | Neutral | Pessimistic",
    "justification": "2–4 sentence explanation"
  },
  "confidence_level": "High | Medium | Low",
  "key_positives": ["3–5 concrete positives"],
  "key_concerns": ["3–5 concrete concerns"],
  "forward_guidance": {
    "revenue": "...",
    "margin": "...",
    "capex": "..."
  },
  "capacity_utilization_trends": "...",
  "new_growth_initiatives": ["2–3 initiatives"]
}

Transcript:
${trimmedText}
`;

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  });

  const response = await result.response;
  const text = response.text();

  return cleanJSONResponse(text);
}

module.exports = { generateSummary };