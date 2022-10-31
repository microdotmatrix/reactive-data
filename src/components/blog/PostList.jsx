import { Link } from 'react-router-dom'
import Section from '_c/Section'

export default function PostList({ posts }) {
  return (
    <div className="post-list grid grid-cols-2">
      {posts?.nodes.map(({ id, slug, title, excerpt, date }, index) => (
        <Section key={index}>
          <h4><Link to={slug}>{title}</Link></h4>
          <span>{date}</span>
          <div dangerouslySetInnerHTML={{ __html: excerpt}} />
        </Section>
      ))}
    </div>
  )
}
