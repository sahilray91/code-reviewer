const aiService = require("../services/ai.service")


module.exports.getReview = async (req, res) => {
    const code = req.body.code || req.query.prompt;

    if (!code) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const reviewText = await aiService(code);
        return res.json({ review: reviewText });
    } catch (error) {
        console.error("AI service error:", error);
        return res.status(500).json({
            error: "AI service unavailable",
            details: error.message || "Unknown error",
        });
    }
}
