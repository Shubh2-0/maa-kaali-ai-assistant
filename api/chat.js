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
    const modifiedMessages = messages.map((m, i) => {
      if (i === messages.length - 1 && m.role === 'user') {
        return { ...m, content: m.content + ' /no_think' }
      }
      return m
    })

    const response = await fetch('https://api.osmapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OSM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen3.5-397b-a17b',
        messages: modifiedMessages,
        temperature: 0.7,
        max_tokens: 800,
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
    if (!content && msg?.reasoning) {
      content = msg.reasoning
    }

    content = content
      .replace(/<think>[\s\S]*?<\/think>/gi, '')
      .replace(/\/no_think/gi, '')
      .trim()

    if (data.choices?.[0]?.message) {
      data.choices[0].message.content = content || 'Main aapki madad karne ke liye tayyar hun! Kya dhundh rahe hain?'
    }

    return res.status(200).json(data)
  } catch (err) {
    console.error('Chat API error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
