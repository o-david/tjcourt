import { useEffect } from 'react'

function ensureTag<T extends HTMLElement>(selector: string, create: () => T): T {
  let el = document.head.querySelector(selector) as T | null
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  return el!
}

export interface SEOProps {
  title?: string
  description?: string
  canonicalPath?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'player' | 'app'
  jsonLd?: Record<string, unknown>
}

export default function SEO({
  title,
  description,
  canonicalPath,
  ogTitle,
  ogDescription,
  ogImage = '/tj-logo.svg',
  twitterCard = 'summary',
  jsonLd
}: SEOProps) {
  useEffect(() => {
    if (title) document.title = title

    if (description) {
      const metaDesc = ensureTag('meta[name="description"]', () => {
        const m = document.createElement('meta')
        m.setAttribute('name', 'description')
        return m
      })
      metaDesc.setAttribute('content', description)
    }

    if (canonicalPath) {
      const linkCanonical = ensureTag('link[rel="canonical"]', () => {
        const l = document.createElement('link')
        l.setAttribute('rel', 'canonical')
        return l
      })
      const origin = window.location.origin
      linkCanonical.setAttribute('href', origin + canonicalPath)
    }

    const og = {
      'og:type': 'website',
      'og:site_name': 'TJ Table Tennis Club',
      'og:title': ogTitle || title || 'TJ Table Tennis Club',
      'og:description': ogDescription || description || 'Standings, fixtures and match stats.',
      'og:image': ogImage,
      'og:url': canonicalPath ? (window.location.origin + canonicalPath) : window.location.href
    } as Record<string, string>
    Object.entries(og).forEach(([prop, content]) => {
      const el = ensureTag(`meta[property="${prop}"]`, () => {
        const m = document.createElement('meta')
        m.setAttribute('property', prop)
        return m
      })
      el.setAttribute('content', content)
    })

    const tw = {
      'twitter:card': twitterCard,
      'twitter:title': ogTitle || title || 'TJ Table Tennis Club',
      'twitter:description': ogDescription || description || 'Standings, fixtures and match stats.',
      'twitter:image': ogImage
    } as Record<string, string>
    Object.entries(tw).forEach(([name, content]) => {
      const el = ensureTag(`meta[name="${name}"]`, () => {
        const m = document.createElement('meta')
        m.setAttribute('name', name)
        return m
      })
      el.setAttribute('content', content)
    })

    const jsonId = 'jsonld-seo'
    let jsonTag = document.getElementById(jsonId) as HTMLScriptElement | null
    if (jsonLd) {
      if (!jsonTag) {
        jsonTag = document.createElement('script')
        jsonTag.type = 'application/ld+json'
        jsonTag.id = jsonId
        document.head.appendChild(jsonTag)
      }
      jsonTag.textContent = JSON.stringify(jsonLd)
    } else if (jsonTag) {
      jsonTag.remove()
    }
  }, [title, description, canonicalPath, ogTitle, ogDescription, ogImage, twitterCard, jsonLd])

  return null
}