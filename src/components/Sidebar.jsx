/* eslint-disable react/prop-types */
function Sidebar({
  deleteNote,
  createNewNote,
  setCurrentNoteId,
  currentNote,
  sortedNotes,
}) {
  return (
    <section>
      <div>
        <h3>Notes</h3>
        <button onClick={() => createNewNote()} className="">
          +
        </button>
      </div>
      <div>
        {sortedNotes.map((note) => {
          return (
            <div key={note.id}>
              <div
                className={`title ${
                  note.id === currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => setCurrentNoteId(note.id)}
              >
                <h4 className="">{note.body.split("\n")[0]}</h4>
                <button onClick={() => deleteNote(note.id)}>D</button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Sidebar;
