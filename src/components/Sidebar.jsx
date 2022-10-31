import { useLoaderData, Link } from "react-router-dom";
import { Icon } from '@iconify-icon/react';

import Nav from '_c/Nav';

export default function Sidebar() {
  const { notes } = useLoaderData();

  return (
    <div className="max-h-screen fixed flex flex-col">
      <Link to="/">
        <h1>
          <Icon icon="brandico:wordpress" width="180px" />
        </h1>
      </Link>
      <div className="py-3 my-6 border-t border-b border-slate-300 dark:border-slate-900">
        <Nav />
      </div>
      <p>
        <Link to="new">Create Note</Link>
      </p>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <Link to={`/note/${note.id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}