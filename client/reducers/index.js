import { SET_ALL_NOTES, SET_SELECTED_NOTE } from '../actions';

const initialState = {
  notes: []
};

const note = (state = initialState, action) => {
  const { notes = [], selectedNote = {} } = action;
  let newState = {};

  switch (action.type) {
    case SET_ALL_NOTES:
      newState = Object.assign({}, state, {notes})
      return newState;
    case SET_SELECTED_NOTE:
      newState = Object.assign({}, state, {selectedNote})
      return newState;
    default:
      return state;
  }
}

export default note;
