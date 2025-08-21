// AI Integration for BwnX Platform
// This module handles AI-powered recommendations and search

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || 'your-openai-api-key'
const OPENAI_API_BASE = process.env.REACT_APP_OPENAI_API_BASE || 'https://api.openai.com/v1'

export const generateRecommendations = async (userQuery, userPreferences = {}) => {
  try {
    const prompt = `
    You are an AI recommendation system for BwnX Platform. 
    Generate personalized recommendations based on the user query: "${userQuery}"
    
    User preferences: ${JSON.stringify(userPreferences)}
    
    Categories available:
    - แอปท่องเที่ยว (Travel Apps)
    - การลงทุน (Investment)
    - เกมเติมเงิน (Gaming)
    - ความงาม (Beauty)
    - เทคโนโลยี (Technology)
    - การศึกษา (Education)
    - ไลฟ์สไตล์ (Lifestyle)
    - ธุรกิจ (Business)
    
    Return a JSON array of 5-10 recommendations with this structure:
    {
      "recommendations": [
        {
          "title": "App/Service Name",
          "description": "Brief description in Thai",
          "category": "category name",
          "rating": 4.5,
          "url": "https://example.com",
          "tags": ["tag1", "tag2"],
          "reason": "Why this is recommended for the user"
        }
      ]
    }
    `

    const response = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant that provides personalized recommendations in Thai language.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    try {
      const recommendations = JSON.parse(aiResponse)
      return recommendations.recommendations || []
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError)
      return generateFallbackRecommendations(userQuery)
    }

  } catch (error) {
    console.error('Error generating AI recommendations:', error)
    return generateFallbackRecommendations(userQuery)
  }
}

export const enhanceSearch = async (query) => {
  try {
    const prompt = `
    Enhance this search query for better results: "${query}"
    
    Return related keywords, synonyms, and search suggestions in Thai.
    Format as JSON:
    {
      "enhanced_query": "improved search terms",
      "keywords": ["keyword1", "keyword2"],
      "suggestions": ["suggestion1", "suggestion2"]
    }
    `

    const response = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.5
      })
    })

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    try {
      return JSON.parse(aiResponse)
    } catch (parseError) {
      return {
        enhanced_query: query,
        keywords: [query],
        suggestions: []
      }
    }

  } catch (error) {
    console.error('Error enhancing search:', error)
    return {
      enhanced_query: query,
      keywords: [query],
      suggestions: []
    }
  }
}

const generateFallbackRecommendations = (query) => {
  // Fallback recommendations when AI is not available
  const fallbackRecommendations = [
    {
      title: "Agoda - จองโรงแรม",
      description: "แอปจองโรงแรมและที่พักยอดนิยม ราคาดี มีโปรโมชั่นเสมอ",
      category: "แอปท่องเที่ยว",
      rating: 4.5,
      url: "https://agoda.com",
      tags: ["โรงแรม", "ท่องเที่ยว", "จองที่พัก"],
      reason: "เหมาะสำหรับการวางแผนการเดินทาง"
    },
    {
      title: "Binance - เทรดคริปโต",
      description: "แพลตฟอร์มเทรดคริปโตเคอร์เรนซี่ที่ใหญ่ที่สุดในโลก",
      category: "การลงทุน",
      rating: 4.3,
      url: "https://binance.com",
      tags: ["คริปโต", "เทรด", "ลงทุน"],
      reason: "สำหรับผู้ที่สนใจลงทุนในสกุลเงินดิจิทัล"
    },
    {
      title: "Shopee - ช้อปปิ้งออนไลน์",
      description: "แอปช้อปปิ้งออนไลน์อันดับ 1 ของไทย มีสินค้าครบครัน",
      category: "ไลฟ์สไตล์",
      rating: 4.4,
      url: "https://shopee.co.th",
      tags: ["ช้อปปิ้ง", "ออนไลน์", "สินค้า"],
      reason: "เหมาะสำหรับการซื้อสินค้าออนไลน์"
    }
  ]

  return fallbackRecommendations.filter(rec => 
    rec.title.toLowerCase().includes(query.toLowerCase()) ||
    rec.description.toLowerCase().includes(query.toLowerCase()) ||
    rec.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 5)
}

export const getChatbotResponse = async (userMessage, context = {}) => {
  try {
    const prompt = `
    You are a helpful assistant for BwnX Platform, a recommendation system.
    User message: "${userMessage}"
    Context: ${JSON.stringify(context)}
    
    Provide a helpful response in Thai language. If the user is asking for recommendations,
    suggest they use the search function or browse categories.
    `

    const response = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant for BwnX Platform. Always respond in Thai language.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content

  } catch (error) {
    console.error('Error getting chatbot response:', error)
    return "ขออภัยครับ ขณะนี้ระบบมีปัญหา กรุณาลองใหม่อีกครั้งหรือใช้ฟังก์ชันค้นหาแทนครับ"
  }
}

