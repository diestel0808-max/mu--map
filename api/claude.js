import Anthropic from '@anthropic-ai/sdk';

// API 키는 환경 변수(ANTHROPIC_API_KEY)에서 가져옵니다.
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Base64 데이터에서 헤더 제거 (data:image/jpeg;base64, 부분)
    const base64Data = imageBase64.split(',')[1] || imageBase64;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: base64Data,
              },
            },
            {
              type: 'text',
              text: `이 티켓 이미지에서 공연 정보(공연명, 장소, 날짜, 시간, 캐스팅)를 추출해줘.
              반드시 아래 JSON 형식으로만 응답해줘. 다른 말은 하지 마.
              {
                "title": "공연명",
                "venue": "장소",
                "date": "YYYY.MM.DD",
                "time": "HH:MM",
                "cast": "배우1, 배우2, ..."
              }`
            }
          ],
        },
      ],
    });

    // 클로드의 응답 텍스트 추출
    const content = response.content[0].text;
    
    // JSON 파싱 후 전달
    res.status(200).json({ content: [{ text: content }] });

  } catch (error) {
    console.error('Claude API Error:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
}
