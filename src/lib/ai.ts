import OpenAI from 'openai'

const client = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
})

export async function aiResponse(prompt: string) {
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 1000
    })
    
    return response.choices?.[0]?.message?.content || ''
  } catch (error) {
    console.error('AI Response Error:', error)
    return 'ขออภัย ระบบ AI ไม่สามารถตอบได้ในขณะนี้'
  }
}

export async function generateRecommendations(category: string, userPreferences?: string) {
  const prompt = `
    สร้างคำแนะนำสำหรับหมวด "${category}" 
    ${userPreferences ? `โดยคำนึงถึงความต้องการ: ${userPreferences}` : ''}
    
    ให้คำแนะนำ 5 รายการ โดยแต่ละรายการมี:
    1. ชื่อ
    2. คำอธิบายสั้น ๆ
    3. ข้อดี
    4. ราคา/ค่าใช้จ่าย
    5. ลิงก์หรือวิธีการเข้าถึง
    
    ตอบเป็นภาษาไทยและให้ข้อมูลที่เป็นประโยชน์จริง
  `
  
  return await aiResponse(prompt)
}

