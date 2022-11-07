import { lazy, Suspense } from 'react';
import { useLoaderData, defer } from 'react-router-dom';
import { getPosts, sleep } from '../../utils/api';

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
      <h1>No posts</h1>
    )
  }
  return (
    <Content>
      <Suspense fallback={<Loading />}>
        <PostList posts={posts} />
      </Suspense>
    </Content>
  )
}