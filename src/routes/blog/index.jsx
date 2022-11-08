import { lazy, Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';
import { getPosts, sleep } from '../../utils/api';

import Loading from '_c/Loading';
const PostList = lazy(() => import('_c/blog/PostList'))
// import PostList from '_c/blog/PostList';

export async function loader() { 
  return defer({ posts: getPosts() })
}

export default function Blog() {
  let data = useLoaderData();
  
  if (!data) {
    return (
      <h1>No posts</h1>
    )
  }
  
  return (
    <Suspense fallback={<Loading />}>
      <Await
        resolve={data.posts}
        errorElement={<h3>Error loading posts</h3>}
      >
        {(data) => <PostList posts={data} />}
      </Await>
    </Suspense>
  )
}