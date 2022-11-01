import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import Section from '_c/Section'

export default function PostList({ posts }) {
  return (
    <div className="post-list grid grid-cols-2 gap-6">
        {posts?.nodes.map(({ id, slug, title, excerpt, date, featuredImage, tags, categories, author }, index) => (
          <Suspense fallback={"Loading post..."}>
            <Section key={index} className='post__card flex flex-col items-stretch justify-start'>
              <figure key={index} className='post__cover w-full overflow-hidden relative z-10 bg-slate-200 dark:bg-slate-900' style={{ height: '100%', minBlockSize: '200px', maxBlockSize: '300px' }}>
                <img src={featuredImage?.node.sourceUrl} alt={featuredImage?.node.altText} className="w-full h-full object-cover object-center" />
                <figcaption className='post__meta absolute top-0 left-0 z-20 flex flex-col justify-end w-full h-full py-3 px-4 bg-zinc-100/50'>
                  <h4 className='post__title'>
                    <Link to={slug}>{title}</Link>
                  </h4>
                  <span className='post__date'>{new Date(date).toDateString()}</span>
                  <span className="post__author">by <Link to={author?.node.url}>{author?.node.name}</Link></span>
                </figcaption>
              </figure>
              <div className='post__excerpt' dangerouslySetInnerHTML={{ __html: excerpt}} />
            </Section>
          </Suspense>
        ))}
      </div>
  )
}
