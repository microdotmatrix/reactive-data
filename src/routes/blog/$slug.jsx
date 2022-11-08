import { lazy, Suspense } from 'react';
import { Link, useLoaderData, useParams, Await } from 'react-router-dom';
import Helmet from 'react-helmet';
import { sleep, getPost } from '_u/api';


import Loading from '_c/Loading';
const PostView = lazy(() => import('_c/blog/PostView'))

export async function loader({ params }) {
  const slug = params.slug;
  return defer({ post: getPost({ slug }) });
}

export default function Post() {
  let data = useLoaderData();
  let slug = useParams();
  
  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Await resolve={data.post} errorElement={"Error getting post data"}>
          {(data) => <PostView key={data.post.slug} post={data.post} slug={slug} />}
        </Await>
      </Suspense>
    </>
  )
}