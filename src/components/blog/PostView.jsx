import { useRef } from 'react';
import { useInView } from 'framer-motion'
import { Icon } from '@iconify-icon/react';

import css from '@css/modules/posts.module.scss'

export default function PostView({ post }) {
  let { title, date, content, featuredImage, author, tags, categories } = post;
  const name = author
    ? author.node.firstName && author.node.lastName
      ? `${author.node.firstName} ${author.node.lastName}`
      : author.node.name
    : null
  
  return (
    <div className={css.post}>
      <header>
        {featuredImage?.node.sourceUrl ? (
          <img src={featuredImage?.node.sourceUrl} alt={title} className="w-full h-full object-cover absolute z-0" />
        ): (
          <img src="https://unsplash.it/1600/1200?random&gravity=center" alt={title} className="w-full h-full object-cover absolute z-0" />  
        )}
        <div className='info py-4 px-12 z-10'>
          <h2>{title}</h2>
          <div className={css.date}>
            <Icon icon="ph:calendar-duotone" width="25" />
            <time dateTime={date} className={css.date}>{new Date(date).toDateString()}</time>
          </div>
          <div className={css.author}>by {name}</div>
          
          <div className='tags'>
            <Icon icon="ph:hash" inline={true} />:  
            {tags?.nodes.map(({ name }, index) => (
              <>
                <Icon icon="ph:tag-chevron-duotone" inline={true} /><span className={css.tag}>{name}</span>
              </>
            ))}
          </div>
          <div className={css.avatar}>
            <img src={author?.node.avatar.url} alt={name} className="grayscale dark:contrast-150" style={{ width: '80px' }} />
          </div>
        </div>
      </header>
      <article>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </article>
    </div>
  )
}
