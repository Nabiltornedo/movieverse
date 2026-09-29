import { useEffect, useRef } from 'react'

/**
 * Calls `onIntersect` when the returned ref's element scrolls into view.
 * Used to trigger loading the next page near the bottom of a grid.
 */
export function useInfiniteScroll(onIntersect, { enabled = true } = {}) {
  const sentinelRef = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const node = sentinelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onIntersect()
      },
      { rootMargin: '400px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [onIntersect, enabled])

  return sentinelRef
}
