
import { useState } from 'react'
import css from '@css/modules/home.module.scss';
import { Link, useLoaderData } from 'react-router-dom';

import Content from '_c/Content';
import Helmet from 'react-helmet';
import { motion } from 'framer-motion';

const content = (isFirstMount) => ({
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: isFirstMount ? 2.8 : 0 },
  },
});

const title = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const products = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export default function Home() {
  const { title, content, date, tags, author, featuredImage } = useLoaderData();
  
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet> 
      <motion.section exit={{ opacity: 0 }}>
        {isFirstMount && <InitialTransition />}
        <header className={css.hero}>
          <img src={featuredImage.node.sourceUrl} alt={featuredImage.altText} />
        </header>
        <motion.div
          initial="initial"
          animate="animate"
          variants={content(isFirstMount)}
          className="container"
        >
          <motion.section
            variants={pageContent}
            className={css.content}
          >
            <h3 className="sub-title">This is the home page...</h3>
            <p>There are many like it, but this one is mine.</p>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </motion.section>
        </motion.div>
      </motion.section>
    </>
  )
}

const InitialTransition = () => {
  // Scroll user to top to avoid showing the footer
  useState(() => {
    typeof windows !== "undefined" && window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="absolute z-50 flex items-center justify-center w-full bg-black"
      initial="initial"
      animate="animate"
      variants={blackBox}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      onAnimationComplete={() =>
        document.body.classList.remove("overflow-hidden")
      }
    >
      <motion.svg variants={textContainer} className="absolute z-50 flex">
        <pattern
          id="pattern"
          patternUnits="userSpaceOnUse"
          width={750}
          height={800}
          className="text-white"
        >
          <rect className="w-full h-full fill-current" />
          <motion.rect
            variants={text}
            className="w-full h-full text-gray-600 fill-current"
          />
        </pattern>
        <text
          className="text-4xl font-bold"
          textAnchor="middle"
          x="50%"
          y="50%"
          style={{ fill: "url(#pattern)" }}
        >
          tailstore
        </text>
      </motion.svg>
    </motion.div>
  );
};