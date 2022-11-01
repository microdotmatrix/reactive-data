import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import Section from '_c/Section'

export default function PostList({ posts }) {
  return (
    <div className="post-list grid grid-cols-2">
        {posts?.nodes.map(({ id, slug, title, excerpt, date }, index) => (
          <Suspense fallback={"Loading post..."}>
            <Section key={index}>
              <h4><Link to={slug}>{title}</Link></h4>
              <span>{new Date(date).toDateString()}</span>
              <div dangerouslySetInnerHTML={{ __html: excerpt}} />
            </Section>
          </Suspense>
        ))}
      </div>
  )
}
