'use client'
import { useEffect } from 'react'

export function ClientAnalytics() {
  useEffect(() => {
    const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || process.env.ANALYTICS_PROVIDER
    
    if (provider === 'posthog') {
      import('posthog-js').then(({ default: posthog }) => {
        posthog.init(process.env.POSTHOG_API_KEY!, { 
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com' 
        })
      })
    } else if (provider === 'umami') {
      const id = process.env.UMAMI_WEBSITE_ID
      const host = process.env.UMAMI_API_HOST
      if (id && host) {
        const script = document.createElement('script')
        script.async = true
        script.setAttribute('data-website-id', id)
        script.src = `${host}/script.js`
        document.body.appendChild(script)
      }
    }
  }, [])

  return null
}

