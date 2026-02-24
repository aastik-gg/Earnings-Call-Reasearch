import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

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