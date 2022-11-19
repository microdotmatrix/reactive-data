import { lazy, Suspense } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getAboutPage } from '../utils/api';

import Loading from '_c/Loading';

export const loader = async () => {
  return await getAboutPage();
}

export default function About() {
  let page = useLoaderData();

  return (
    <div className='page-view about-content'>
      <h1 className="title">{page.title}</h1>
      <h3 className="sub-title">Not sure what this thing is even for, tbh.</h3>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  )
}