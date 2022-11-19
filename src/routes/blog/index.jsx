import { lazy, Suspense } from 'react';
import { useLoaderData } from 'react-router-dom';
import Helmet from 'react-helmet';
import { getPosts, getStickyPosts } from '../../utils/api';

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
    <>
      <Helmet>
        <title>Latest Blog Posts from WordPress</title>
        <meta name="description" content="Latest Blog Posts from WordPress" />
      </Helmet>
      <div className="page-view">
        <Suspense fallback={<Loading />}>
          <PostList posts={posts} />
        </Suspense>
      </div>
    </>
  )
}