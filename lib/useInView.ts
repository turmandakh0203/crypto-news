'use client'
import { useEffect, useRef, useState } from 'react'

type Callback = (isIntersecting: boolean) => void

const callbacks = new Map<Element, Callback>()

const observer =
  typeof window !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            callbacks.get(entry.target)?.(entry.isIntersecting)
          })
        },
        { rootMargin: '-10% 0px -10% 0px', threshold: 0 },
      )
    : null

export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !observer) return
    callbacks.set(el, setInView)
    observer.observe(el)
    return () => {
      observer.unobserve(el)
      callbacks.delete(el)
    }
  }, [])

  return { ref, inView }
}
