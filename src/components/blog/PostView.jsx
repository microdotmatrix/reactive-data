import { useRef } from 'react';
import { useInView } from 'framer-motion'

export default function PostView({ post }) {
  let { title, date, content } = post;

  return (
    <div>
      <h1>{title}</h1>
      <span>{new Date(date).toDateString()}</span>
      <article>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </article>
    </div>
  )
}
