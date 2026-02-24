require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const { generateSummary } = require("./services/geminiService");
const { extractTextFromPDF } = require("./utils/pdfExtractor");

const app = express();
const allowedOrigins = [
  "http://localhost:5173", 
  "https://earnings-call-reasearch.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    let transcriptText = "";

    // Case 1: Pasted text
    if (req.body.transcriptText) {
      transcriptText = req.body.transcriptText;
    }

    // Case 2: File uploaded
    if (req.file) {
      const mimeType = req.file.mimetype;

      // If .txt
      if (mimeType === "text/plain") {
        transcriptText = req.file.buffer.toString("utf-8");
      }

      // If PDF
      else if (mimeType === "application/pdf") {
        transcriptText = await extractTextFromPDF(req.file.buffer);

        // Detect scanned PDF
        if (!transcriptText || transcriptText.trim().length < 200) {
          return res.status(400).json({
            error:
              "Scanned/image-based PDF detected. Please upload a text-based transcript or .txt file.",
          });
        }
      } else {
        return res.status(400).json({
          error: "Unsupported file type. Please upload PDF or TXT.",
        });
      }
    }

    if (!transcriptText || transcriptText.length < 200) {
      return res.status(400).json({
        error: "Transcript text too short or missing.",
      });
    }

    const summary = await generateSummary(transcriptText);

    let parsedSummary;

    try {
      parsedSummary = JSON.parse(summary);
    } catch (err) {
      console.error("JSON parse error:", err);
      return res.status(500).json({
        error: "Model returned invalid JSON",
        rawOutput: summary,
      });
    }

    res.json(parsedSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server listening on port 5000");
});
