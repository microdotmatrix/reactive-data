import { useRef } from 'react';
import { useInView } from 'framer-motion'

export default function PostView({ post }) {
  let { title, date, content, featuredImage, author, tags, categories } = post;

  return (
    <div className='relative w-full'>
      <header className='sticky top-0 right-0 cover w-full h-[40vh] flex flex-col items-start justify-end'>
        <img src={featuredImage?.node.sourceUrl} alt={title} className="w-full h-full object-cover absolute z-0" />
        <div className='info py-4 px-6 z-10'>
          <h2>{title}</h2>
          <time dateTime={date} className='date block'>{new Date(date).toDateString()}</time>
          <span className="author">by {author?.node.name}</span>
        </div>
      </header>
      <article>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </article>
    </div>
  )
}
