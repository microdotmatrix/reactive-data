import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion';
import { pageTransition } from './../utils/motions';

export default function Content({ children, ...props }) {
  let location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      variants={pageTransition}
      initial="init"
      animate="animate"
      transition={{ type: 'spring', stiffness: 5 }}
      exit="exit"
      {...props}
    >
      { children }
    </motion.div>
  )
}