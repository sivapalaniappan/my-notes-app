import * as apiHelper from '../utils/apiHelper';

export const SET_ALL_NOTES = 'SET_ALL_NOTES';
export const SET_SELECTED_NOTE = 'SET_CUTTENT_NOTE';

export const setNotes = notes => ({
  type: SET_ALL_NOTES,
  notes
});

export const setSelectedNote = selectedNote => ({
  type: SET_SELECTED_NOTE,
  selectedNote
});

export const getNotes = () => dispatch => (
  apiHelper.getNotes().then(res => dispatch(setNotes(res)))
);

export const getNote = (noteId) => dispatch => (
  apiHelper.getNote(noteId).then(res => dispatch(setSelectedNote(res)))
);

export const deleteNote = (noteId, callback) => dispatch => (
  apiHelper.deleteNote(noteId).then(res => callback())
);

export const editNote = (note, callback) => dispatch => (
  apiHelper.editNote(note).then(res => callback())
);

export const saveNote = (note, callback) => dispatch => (
  apiHelper.saveNote(note).then(res => callback())
);
