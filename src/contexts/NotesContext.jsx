import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

import { db } from "../firebase/initializeApp";
import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";

const NotesContext = createContext(),
  useNotesContext = () => {
    return useContext(NotesContext);
  },
  // eslint-disable-next-line react/prop-types
  NotesContextProvider = ({ children }) => {
    const { UserData, LoadingUser } = useAuthContext(),
    [Notes, setNotes] = useState([]),
    [CurrentNoteId, setCurrentNoteId] = useState(""),
    [Typing, setTyping] = useState(false),
    [TempNoteText, setTempNoteText] = useState(""),
    currentNote = Notes.find((note) => note.id === CurrentNoteId) || Notes[0],
    sortedNotes = Notes.sort((a, b) => b.updatedAt - a.updatedAt);



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
    return () => unsub();
  }, [UserData]);

  useEffect(() => {
    !CurrentNoteId && setCurrentNoteId(Notes[0]?.id);
    console.log("notes saving");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Notes]);

  useEffect(() => {
    currentNote && setTempNoteText(currentNote.body);
    console.log("note saved ");
    setTyping(false);
  }, [currentNote]);

  useEffect(() => {
    setTyping(true);
    const TimeoutId = setTimeout(async () => {
      TempNoteText !== currentNote?.body && (await updateNote(TempNoteText));
    }, 1200);
    return () => {
      clearTimeout(TimeoutId);
      setTyping(false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TempNoteText]);

  const updateNote = async (text) => {
    await setDoc(
      doc(
        collection(doc(db, "data", UserData.email), "notes"),
        CurrentNoteId
      ),
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
console.log(UserData);
console.log(LoadingUser);
    return (
      <NotesContext.Provider
        value={{
          Notes,
          Typing,
          createNewNote,
          LoadingUser,
          UserData,
          deleteNote,
          setCurrentNoteId,
          currentNote,
          sortedNotes,
          TempNoteText,
          setTempNoteText,
        }}
      >
        {children}
      </NotesContext.Provider>
    );
  };
// eslint-disable-next-line react-refresh/only-export-components
export { NotesContextProvider, useNotesContext };
