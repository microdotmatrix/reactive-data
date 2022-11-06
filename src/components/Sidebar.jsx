import { useLoaderData, Link } from "react-router-dom";
import { Icon } from '@iconify-icon/react';

import Nav from '_c/Nav';

export default function Sidebar({ menu }) {
  const notes = useLoaderData();
  return (
    <div className="sidebar">
      <section className="site-logo">
        <Link to="/">
          <Icon icon="simple-icons:saturn" width="240px" />
        </Link>
      </section>
      
      <section className="site-nav">
        <Nav menu={menu} />
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