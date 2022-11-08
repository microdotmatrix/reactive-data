import { Link, useAsyncValue } from 'react-router-dom'
import { Icon } from '@iconify-icon/react';

import css from '@css/modules/posts.module.scss'

export default function PostView({ post }) {
  let { title, date, content, featuredImage, author, tags, categories } = useAsyncValue();

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
          <div className={css.categories}>
            <Icon icon="mdi:cat" width="1.2em" />
            {categories?.nodes.map(({ name }, index) => (
              <span key={index}>{name}</span>
            ))}
          </div>
          <h2>{title}</h2>
          <div className={css.date}>
            <Icon icon="ph:calendar-duotone" width="25" />
            <time dateTime={date} className={css.date}>{new Date(date).toDateString()}</time>
          </div>
          <div className={css.author}>by {name}</div>
          
          <div className={css.tags}>
            <span style={{ opacity: 0, marginLeft: '-10px' }}>#</span>
            {tags?.nodes.map(({ name, slug }, index) => (
              <>
                <Link to={`/blog/tags/${slug}`} key={index}>
                  <Icon icon="ph:tag-chevron-duotone" inline={true} />
                  <span className={css.tag}>{name}</span>
                </Link>
              </>
            ))}
          </div>
          <div className={css.avatar}>
            <Link to={`/users/${author?.node.slug}`}><img src={author?.node.avatar.url} alt={name} className="grayscale dark:contrast-150" style={{ width: '80px' }} /></Link>
          </div>
        </div>
      </header>
      <article>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </article>
    </div>
  )
}
