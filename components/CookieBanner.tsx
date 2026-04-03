'use client'

import { useState, useEffect } from 'react'

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void
  }
}

function grantConsent() {
  window.gtag?.('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  })
  window.clarity?.('consent')
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      setVisible(true)
    } else if (consent === 'accepted') {
      grantConsent()
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    grantConsent()
    setVisible(false)
  }

  function dismiss() {
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[calc(100vw-2rem)] max-w-2xl bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl p-7">
      {/* X close */}
      <button
        onClick={dismiss}
        aria-label="Close"
        className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Icon + text */}
      <div className="flex items-start gap-4 mb-6 pr-6">
        <svg className="w-11 h-11 shrink-0 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
          <circle cx="8.5" cy="10" r="1" fill="currentColor" stroke="none" />
          <circle cx="13" cy="8" r="0.75" fill="currentColor" stroke="none" />
          <circle cx="9" cy="14.5" r="0.75" fill="currentColor" stroke="none" />
          <circle cx="14" cy="13" r="1" fill="currentColor" stroke="none" />
          <circle cx="11.5" cy="17" r="0.75" fill="currentColor" stroke="none" />
          <circle cx="16" cy="9.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
        <p className="text-base text-gray-300 leading-relaxed">
          This site uses cookies to help improve your user experience. Learn more about how we use
          cookies in our{' '}
          <a href="/contact" className="text-blue-400 hover:text-blue-300 underline">
            Cookie Notice
          </a>
          .
        </p>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={dismiss}
          className="py-3 text-sm font-bold text-white border border-white/20 hover:border-white/60 rounded-xl transition-colors"
        >
          Customize Cookies
        </button>
        <button
          onClick={accept}
          className="py-3 text-sm font-bold text-white border border-white/20 hover:border-white/60 rounded-xl transition-colors"
        >
          Ok
        </button>
      </div>
    </div>
  )
}
