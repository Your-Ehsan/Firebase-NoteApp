import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/initializeApp";
import Editor from "../components/Editor";
import Sidebar from "../components/Sidebar";
import { useLoaderData } from "react-router-dom";

function Home() {
  const [Notes, setNotes] = useState([]),
    [CurrentNoteId, setCurrentNoteId] = useState(""),
    [Typing, setTyping] = useState(false),
    [TempNoteText, setTempNoteText] = useState(""),
    { UserData, LoadingUser } = useLoaderData();

  console.log(LoadingUser, UserData);

  const currentNote =
    Notes.find((note) => note.id === CurrentNoteId) || Notes[0];

  const sortedNotes = Notes.sort((a, b) => b.updatedAt - a.updatedAt);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(doc(db, "data", UserData.email), "notes"),
      (snapshot) => {
        const notesArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNotes(notesArr);
      }
    );
    // const unsub = onSnapshot(collection(db, "data"), (snapshot) => {
    //   const notesArr = snapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    //   setNotes(notesArr);
    // });
    return () => unsub();
  }, [UserData.email]);

  useEffect(() => {
    !CurrentNoteId && setCurrentNoteId(Notes[0]?.id);
    console.log("notes saving");
  }, [Notes]);

  useEffect(() => {
    currentNote && setTempNoteText(currentNote.body);
    console.log("note saved ");
    setTyping(false);
  }, [currentNote]);

  useEffect(() => {
    setTyping(true);
    const TimeoutId = setTimeout(async () => {
      TempNoteText !== currentNote.body && (await updateNote(TempNoteText));
    }, 1200);
    return () => {
      clearTimeout(TimeoutId);
      setTyping(false);
    };
  }, [TempNoteText]);
  const updateNote = async (text) => {
    await setDoc(
      doc(db, "notes", CurrentNoteId),
      { body: text, updatedAt: Date.now() },
      { merge: true }
    );
  };
  const createNewNote = async () => {
    // newNoteRef = await addDoc(collection(db, "data",), newNote);
    const newNoteRef = await addDoc(
      collection(doc(db, "data", UserData.email), "notes"),
      {
        // object
        body: `# 1st markdown's Title`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
    );
    setCurrentNoteId(newNoteRef.id);
  };

  const deleteNote = async (noteId) => {
    const docRef = doc(
      collection(doc(db, "data", UserData.email), "notes"),
      noteId
    );
    await deleteDoc(docRef);
    // setCurrentNoteId(sortedNotes[0].id);
  };
  return (
    <section>
      {Notes.length ? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <Editor
              TempNoteText={TempNoteText}
              setTempNoteText={setTempNoteText}
            />
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <div className="menu p-4 w-80 h-full bg-base-200 text-base-content overflow-y-auto">
              {/* Sidebar content here */}
              <Sidebar
                sortedNotes={sortedNotes}
                currentNote={currentNote}
                setCurrentNoteId={setCurrentNoteId}
                createNewNote={createNewNote}
                deleteNote={deleteNote}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>You have no notes</h1>
          <button onClick={() => createNewNote()}>Create new</button>
        </div>
      )}
      {Typing && console.log("typing ...")}
    </section>
  );
}

export default Home;
