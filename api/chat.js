export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array required' })
  }

  try {
    const response = await fetch('https://api.osmapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OSM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen3.5-397b-a17b',
        messages,
        temperature: 0.7,
        max_tokens: 1500,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('osmAPI error:', error)
      return res.status(response.status).json({ error: 'AI service error' })
    }

    const data = await response.json()
    const msg = data.choices?.[0]?.message

    let content = msg?.content || ''

    // If content is empty (model spent all tokens thinking), return empty
    // Do NOT use reasoning field — it contains garbage thinking text

    // Clean any thinking tags
    content = content
      .replace(/<think>[\s\S]*?<\/think>/gi, '')
      .replace(/\/no_think/gi, '')
      .replace(/Thinking Process:[\s\S]*/gi, '')
      .replace(/\*\*Analyze[\s\S]*/gi, '')
      .replace(/^\s*\d+\.\s+(Analyze|Review|Select|Draft|Check|Determine|Final)[\s\S]*/gmi, '')
      .trim()

    if (data.choices?.[0]?.message) {
      data.choices[0].message.content = content || ''
    }

    return res.status(200).json(data)
  } catch (err) {
    console.error('Chat API error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
