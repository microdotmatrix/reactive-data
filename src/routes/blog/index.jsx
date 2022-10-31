import { lazy, Suspense } from 'react';
import { useLoaderData } from 'react-router-dom';
import { sleep, getPosts } from '../../utils/api';

import Content from '_c/Content';
import Loading from '_c/Loading';
const PostList = lazy(() => import('_c/blog/PostList'))

export async function loader() {
  return await getPosts();
}

export default function Blog() {
  let posts = useLoaderData();
  if (!posts) {
    return (
      <h1>Trying to get those posts together, give us a minute...</h1>
    )
  }
  return (
    <Suspense fallback={<Loading />}>
      <Content>
        <PostList posts={posts} />
      </Content>
    </Suspense>
  )
}