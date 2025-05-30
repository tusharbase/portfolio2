"use client"

import { useEffect, useRef, useState } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
}

export function useInView({
  threshold = 0,
  root = null,
  rootMargin = "0%",
  triggerOnce = false,
}: UseIntersectionObserverProps = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [node, setNode] = useState<Element | null>(null)

  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)
        if (triggerOnce && entry.isIntersecting && observer.current) {
          observer.current.disconnect()
        }
      },
      {
        threshold,
        root,
        rootMargin,
      },
    )

    const { current: currentObserver } = observer

    if (node) currentObserver.observe(node)

    return () => currentObserver.disconnect()
  }, [node, threshold, root, rootMargin, triggerOnce])

  return [setNode, !!entry?.isIntersecting] as const
}
