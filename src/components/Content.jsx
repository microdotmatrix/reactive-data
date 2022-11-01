import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion';
import { pageTransition } from './../utils/motions';

export default function Content({ children }) {
  let location = useLocation();
  return (
    <motion.div
      key={location}
      variants={pageTransition}
      initial="init"
      animate="animate"
      transition={{ type: 'spring', stiffness: 5 }}
      exit="exit"
    >
      { children }
    </motion.div>
  )
}