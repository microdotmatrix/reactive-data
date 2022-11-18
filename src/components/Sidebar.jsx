import { useContext } from 'react'
import { useLoaderData, Link } from "react-router-dom";
import { Icon } from '@iconify-icon/react';

import Nav from '_c/Nav';
import { ShopContext } from '_x/store';

export default function Sidebar({ menu }) {
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

      <section className="notes-block">
        <div className="flex-1">
          {notes?.length > 0 ? (
            <ul>
              {notes.map((note, index) => (
                <li key={index}>
                  <Link to={`/note/${note.id}`}>{note.title}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <span>No Notes Saved</span>
          )}
        </div>
        
        <button className="btn"><Link to="/new">Create Note</Link></button>
      </section>
    </div>
  )
}