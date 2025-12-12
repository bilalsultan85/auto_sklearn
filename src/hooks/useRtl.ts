import { useEffect, useState } from 'react'

export const useRtl = () => {
  const [isRtl, setIsRtl] = useState(() => {
    const stored = localStorage.getItem('rtl')
    if (stored === null) return false
    return stored === 'true'
  })

  useEffect(() => {
    const html = document.documentElement
    html.dir = isRtl ? 'rtl' : 'ltr'
    html.lang = isRtl ? 'ar' : 'en'

    if (isRtl) {
      html.classList.add('rtl')
    } else {
      html.classList.remove('rtl')
    }

    localStorage.setItem('rtl', String(isRtl))
  }, [isRtl])

  const toggleRtl = () => {
    setIsRtl((prev) => !prev)
  }

  return { isRtl, toggleRtl, setIsRtl }
}
