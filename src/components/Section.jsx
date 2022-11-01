import { useRef } from 'react'
import { useInView } from 'framer-motion'

export default function Section({ children, ...props }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false })
  return (
    <section ref={ref}
      style={{
        transform: isInView ? "none" : "translateY(-40px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
      {...props}
    >
      { children }
    </section>
  )
}