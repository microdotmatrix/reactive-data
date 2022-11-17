import { Link } from 'react-router-dom'

import css from '@css/modules/posts.module.scss';

export default function PostList({ posts }) {
  return (
    <div className={css.postList}>
        {posts?.nodes.map(({ postId, slug, title, excerpt, date, featuredImage, tags, categories, author }, index) => (
         
            <section className='post__card flex flex-col items-stretch justify-start'>
              <figure className={css.post__cover}>
                {featuredImage?.node.sourceUrl ? (
                  <img src={featuredImage?.node.sourceUrl} alt={title} className="w-full h-full object-cover object-center opacity-70" />
                ): (
                  <img src="https://placeskull.com/1024/960/1f2731/17" alt={title} className="w-full h-full object-cover object-center opacity-70" />  
                )}
                <figcaption className={css.meta}>
                  <h4 className='post__title'>
                    <Link to={slug}>{title}</Link>
                  </h4>
                  <span className='post__date'>{new Date(date).toDateString()}</span>
                  <span className="post__author">by <Link to={author?.node.url}>{author?.node.name}</Link></span>
                </figcaption>
              </figure>
              <div className={css.excerpt} dangerouslySetInnerHTML={{ __html: excerpt}} />
            </section>
        ))}
      </div>
  )
}
