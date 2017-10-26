const headers = {
  'Accept': 'application/json',
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
};

const hostUrl = 'http://localhost:8080';
// const hostUrl = '';

export const getHeartbeat = () => {
  return fetch(`${hostUrl}/api`, headers)
    .then(res => res.json());
};

export const getNotes = () => {
  return fetch(`${hostUrl}/api/notes`, headers)
    .then(res => res.json());
};

export const getNote = (noteId) => {
  return fetch(`${hostUrl}/api/note/${noteId}`, headers)
    .then(res => res.json());
};

export const deleteNote = (noteId) => {
  headers.method = 'DELETE';
  return fetch(`${hostUrl}/api/note/${noteId}`, headers)
    .then(() => {});
};

export const editNote = (note) => {
  return fetch(`${hostUrl}/api/note/${note.id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
          })
          .then(res => res);
};

export const saveNote = (note) => {
  return fetch(`${hostUrl}/api/saveNote`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
          })
          .then(res => res.json());
};
