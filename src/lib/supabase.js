import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fztszhpbkztfzzzhktxx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6dHN6aHBia3p0Znp6emhrdHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3NzU5MjQsImV4cCI6MjA1MDM1MTkyNH0.placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database functions
export const searchRecommendations = async (query, category = null) => {
  try {
    let queryBuilder = supabase
      .from('recommendations')
      .select('*')
      .ilike('title', `%${query}%`)
      .limit(20)

    if (category) {
      queryBuilder = queryBuilder.eq('category', category)
    }

    const { data, error } = await queryBuilder
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error searching recommendations:', error)
    return []
  }
}

export const getCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export const getPopularRecommendations = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .order('rating', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching popular recommendations:', error)
    return []
  }
}

export const addRecommendation = async (recommendation) => {
  try {
    const { data, error } = await supabase
      .from('recommendations')
      .insert([recommendation])
      .select()
    
    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Error adding recommendation:', error)
    return null
  }
}

export const updateStats = async () => {
  try {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching stats:', error)
    return {
      total_recommendations: 10000,
      languages_supported: 10,
      categories: 8,
      daily_updates: '24/7'
    }
  }
}

