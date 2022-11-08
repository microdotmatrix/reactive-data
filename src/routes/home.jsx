import css from '@css/modules/home.module.scss';
import { Link, useLoaderData } from 'react-router-dom';

import Helmet from 'react-helmet';

export default function Home() {
  const { title, content, date, tags, author, featuredImage } = useLoaderData();
  
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet> 
      <header className={css.hero}>
        <img src={featuredImage.node.sourceUrl} alt={featuredImage.altText} />
      </header>
      <div className={css.content}>
        <h3 className="sub-title">This is the home page...</h3>
        <p>There are many like it, but this one is mine.</p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  )
}

