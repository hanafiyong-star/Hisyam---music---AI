export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      title,
      lyrics,
      style,
      vocalGender = "m"
    } = req.body;

    const response = await fetch(
      "https://api.kie.ai/api/v1/jobs/createTask",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.KIE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "ai-music-api/generate",
          input: {
            prompt: lyrics || "",
            lyrics: lyrics || "",
            custom_mode: true,
            instrumental: false,
            model: "V6",
            style: style || "Pop",
            title: title || "Hisyam Music AI",
            vocal_gender: vocalGender
          }
        })
      }
    );

    const data = await response.json();

    return res.status(response.ok ? 200 : response.status).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Music generation failed",
      message: error.message
    });
  }
}
