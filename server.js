import express from 'express'
import { config } from 'dotenv'
config()

const app = express()
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})
app.use(express.json())

app.post('/api/chat', async (req, res) => {
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

    // If content is empty (model used all tokens on thinking), return null
    // Don't try to extract from reasoning — it's always garbage

    // Clean up
    content = content
      .replace(/<think>[\s\S]*?<\/think>/gi, '')
      .replace(/\/no_think/gi, '')
      .replace(/^["']+|["']+$/g, '')
      .trim()

    if (data.choices?.[0]?.message) {
      data.choices[0].message.content = content || ''
    }

    console.log('AI response:', content?.substring(0, 300))
    return res.status(200).json(data)
  } catch (err) {
    console.error('Chat API error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`))
