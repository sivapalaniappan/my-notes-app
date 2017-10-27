const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export const getNotes = () => {
  return fetch(`/api/notes`, {
            method: 'GET',
            headers
          })
          .then(res => res.json());
};

export const getNote = (noteId) => {
  return fetch(`/api/note/${noteId}`, {
            method: 'GET',
            headers
          })
          .then(res => res.json());
};

export const deleteNote = (noteId) => {
  return fetch(`/api/note/${noteId}`, {
            method: 'DELETE',
            headers
          })
          .then(() => {});
};

export const editNote = (note) => {
  return fetch(`/api/note/${note.id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(note)
          })
          .then(res => res);
};

export const saveNote = (note) => {
  return fetch(`/api/saveNote`, {
            method: 'POST',
            headers,
            body: JSON.stringify(note)
          })
          .then(res => res.json());
};
