import { useState } from 'react';
import { useLoaderData } from 'react-router-dom'

import Content from '_c/Content';

export default function About() {
  let page = useLoaderData();
  return (
    <Content className="container">
      <div className='about-content'>
        <h1 className="title">About...?</h1>
        <h3 className="sub-title">Not sure what this thing is even for, tbh.</h3>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </Content>
  )
}