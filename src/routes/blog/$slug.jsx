import { lazy, Suspense } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Helmet from 'react-helmet';
import { sleep, getPost } from '_u/api';


import Loading from '_c/Loading';
const PostView = lazy(() => import('_c/blog/PostView'))

export async function loader({ params }) {
  const slug = params.slug;
  return await getPost({ slug });
}

export default function Post() {
  let post = useLoaderData();
  let slug = useParams();
  
  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <Suspense fallback={<Loading />}>
        <PostView key={slug} post={post} slug={slug} />
      </Suspense>
    </>
  )
}