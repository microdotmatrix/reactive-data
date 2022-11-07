// Framer Motion element variants

export const pageTransition = {
  init: {
    scale: 1,
    y: '-30px',
    opacity: 0,
    transition: {
      delay: 0,
      duration: 0.75
    }
  },
  animate: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
    }
  },
  exit: {
    scale: 0.5,
    rotate: 90,
    y: '30px',
    opacity: 0,
    transition: {
      delay: 0,
      duration: 1.5
    }
  },
  transition: {
    duration: 0.5
  },
  transitionEnd: {
    display: "none"
  }
}