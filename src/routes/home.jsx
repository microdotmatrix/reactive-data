import Content from '_c/Content';
import Helmet from 'react-helmet';

export default function Home() {
  
  return (
    <>
      <Helmet>
        <title>hello mello</title>
      </Helmet> 
      <Content>
        <div className="home-content">
          <h1>Welcome</h1>
          <h3 className="sub-title">This is the home page...</h3>
          <p>There are many like it, but this one is mine.</p>
        </div>
      </Content>
    </>
  )
}