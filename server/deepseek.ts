interface DeepSeekMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function queryDeepSeek(userQuestion: string, context: string): Promise<string> {
  if (!process.env.DEEPSEEK_API_KEY) {
    throw new Error("DeepSeek API key not configured");
  }

  const systemPrompt = `You are Neury, the AI assistant for NeuroNet AI Solutions, a professional AI consulting and automation company. 

Company Context:
- We specialize in AI consulting, business process automation, chatbot development, computer vision, and data analytics
- We serve small to medium enterprises globally with AI transformation
- Our pricing: AI Strategy Session ($299), Implementation Plan ($999), Enterprise Consulting ($2,999)
- Contact: +263 78 549 4594, ngonidzashezimbwa95@gmail.com
- We have proven results: 45% conversion increase, 70% response time reduction, 95% defect detection accuracy

Current page context: ${context}

Guidelines:
- Be helpful, professional, and enthusiastic about AI
- Focus on business value and practical applications
- If asked about specific technical implementations, provide detailed but accessible explanations
- Always relate responses back to how NeuroNet can help the user
- Keep responses concise but informative (2-3 paragraphs max)
- Use minimal emojis and avoid complex formatting
- Do NOT use markdown formatting like **bold**, *italic*, or bullet points with - or *
- Use simple line breaks and basic formatting only
- Write in plain text with clear paragraph breaks
- If the question is about competitors, focus on our unique value proposition
- For complex technical questions, break down concepts into business-friendly terms`;

  const messages: DeepSeekMessage[] = [
    {
      role: "system",
      content: systemPrompt
    },
    {
      role: "user",
      content: userQuestion
    }
  ];

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API error:", response.status, errorText);
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data: DeepSeekResponse = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response format from DeepSeek");
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error querying DeepSeek:", error);
    throw error;
  }
}