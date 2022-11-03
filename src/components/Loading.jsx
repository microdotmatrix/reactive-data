import React from 'react'
import { Icon } from '@iconify-icon/react'
import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        restDelta: 0.5,
        duration: 0.75
      }}
      className='loading'
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: 'spring',
          restDelta: 0.75,
          duration: 0.95
        }}
      >
        <div className="spinner"></div>
      </motion.div>
    </motion.div>
  )
}

export default Loading