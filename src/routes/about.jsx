import { lazy, Suspense } from 'react';
import { useLoaderData } from 'react-router-dom';

import Loading from '_c/Loading';
const PageView = lazy(() => import('_c/PageView'));

export default function About() {
  let page = useLoaderData();

  return (
    <div className='about-content'>
      <h1 className="title">{page.title}</h1>
      <h3 className="sub-title">Not sure what this thing is even for, tbh.</h3>
      <Suspense fallback={<Loading />}>
        <PageView page={page} />
      </Suspense>
    </div>
  )
}