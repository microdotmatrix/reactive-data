import { lazy, Suspense } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getPosts } from '../../utils/api';

import Loading from '_c/Loading';
const PostList = lazy(() => import('_c/blog/PostList'))

export async function loader() { 
  return await getPosts()
}

export default function Blog() {
  let posts = useLoaderData();
  
  if (!posts) {
    return (
      <h1>No posts</h1>
    )
  }
  
  return (
    <Suspense fallback={<Loading />}>
      <PostList posts={posts} />
    </Suspense>
  )
}