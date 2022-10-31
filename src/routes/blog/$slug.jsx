import { lazy, Suspense, useRef } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { sleep, getPost } from '_u/api';


import Loading from '_c/Loading';
import Content from '_c/Content'
const PostView = lazy(() => import('_c/blog/PostView'))

export async function loader({ params }) {
  const slug = params.slug;
  return await getPost({ slug });
}

export default function Post() {
  let post = useLoaderData();
  let slug = useParams();
  return (
    <Content>
      <Suspense fallback={<Loading />}>
        <PostView post={post} slug={slug} />
      </Suspense>
    </Content>
  )
}