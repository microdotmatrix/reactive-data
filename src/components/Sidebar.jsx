import { useContext } from 'react'
import { useLoaderData, Link } from "react-router-dom";
import { Icon } from '@iconify-icon/react';

import Nav from '_c/Nav';
import NoteList from '_c/NoteList'
import { ShopContext } from '_x/store';

export default function Sidebar() {
  const notes = useLoaderData();
  const { isNavOpen, closeNav } = useContext(ShopContext)
  return (
    <div className="sidebar">
      <section className="site-logo">
        <Link to="/" onClick={() => closeNav()}>
          <Icon icon="simple-icons:saturn" width="100%" />
        </Link>
      </section>
      
      <section className="site-nav">
        <Nav />
      </section>

      {/* <NoteList notes={notes} /> */}
    </div>
  )
}