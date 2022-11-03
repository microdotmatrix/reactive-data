import { Link, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { getHomePage, getSiteInfo } from '_u/api'

import Content from '_c/Content';
import Helmet from 'react-helmet';

export async function loader() {
  return await getHomePage();
}

export default function Home() {
  let page = useLoaderData();
  const { content, date, tags, author, featuredImage } = page;
  return (
    <>
      <Helmet>
        <title>fuck it</title>
      </Helmet> 
      <Content>
        <div className="home-content">
          
          <h3 className="sub-title">This is the home page...</h3>
          <p>There are many like it, but this one is mine.</p>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </Content>
    </>
  )
}

