import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const analyzeTranscript = async ({ file, transcriptText }) => {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${API_BASE_URL}/analyze`,
      formData
    );

    return response.data;
  }

  if (transcriptText) {
    const response = await axios.post(
      `${API_BASE_URL}/analyze`,
      { transcriptText }
    );

    return response.data;
  }

  throw new Error("No input provided");
};