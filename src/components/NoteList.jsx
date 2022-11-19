import { Link } from 'react-router-dom'

const NoteList = ({ notes }) => {
  return (
    <section className="notes-block">
      <div className="flex flex-col justify-between h-full">
        {notes?.length > 0 ? (
          <ul>
            {notes.map((note, index) => (
              <li key={index} className="text-sm">
                <Link to={`/note/${note.id}`}>{note.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <span className="font-sans italic text-sm">No notes found for this session...</span>
            <span className="font-sans font-semibold text-sm block">Write one!</span>
          </div>
        )}
      </div>
      
      <button className="btn"><Link to="/new">Create Note</Link></button>
    </section>
  )
}

export default NoteList
