// api/claude.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { imageBase64 } = req.body;
  const apiKey = process.env.CLAUDE_API_KEY; // Vercel 환경변수에서 키를 가져옴

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: "image/jpeg", data: imageBase64 } },
          { type: "text", text: "이 티켓의 공연명, 일시, 장소, 캐스팅 정보를 JSON 형식으로 추출해줘." }
        ]
      }]
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
