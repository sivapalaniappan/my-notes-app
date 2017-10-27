import React from 'react';
import { shallow, mount } from 'enzyme';
import NoteFormConnected, { NoteForm, mapStateToProps, mapDispatchToProps} from './noteForm';

import * as pageActions from '../actions';
jest.mock('../actions');
pageActions.getNote.mockImplementation(() => 'MockedGetNoteAction');
pageActions.saveNote.mockImplementation(() => 'MockedSaveNoteAction');
pageActions.editNote.mockImplementation(() => 'MockedEditNoteAction');

describe('client/components/noteForm.js', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('mapStateToProps', () => {
    it('should return an object with note value from the state.selectedNote', () => {
      // Arrange
      const inputState = {
        selectedNote: { foo: 'bar' }
      };
      const expected = {
        note: { foo: 'bar' }
      };

      // Act
      const actual = mapStateToProps(inputState);

      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should map dispatch(getNote(noteId)) to getNoteToEdit method on props', () => {
      // Arrange
      const dispatch = jest.fn();

      // Act
      const actual = mapDispatchToProps(dispatch);
      actual.getNoteToEdit('12345');

      // Assert
      expect(pageActions.getNote).toHaveBeenCalledWith('12345');
      expect(dispatch).toHaveBeenCalledWith('MockedGetNoteAction');
    });

    it('should map dispatch(saveNote(noteId, callback)) to saveThisNote method on props', () => {
      // Arrange
      const dispatch = jest.fn();
      const callback = jest.fn();

      // Act
      const actual = mapDispatchToProps(dispatch);
      actual.saveThisNote('12345', callback);

      // Assert
      expect(pageActions.saveNote).toHaveBeenCalledWith('12345', callback);
      expect(dispatch).toHaveBeenCalledWith('MockedSaveNoteAction');
    });

    it('should map dispatch(editNote(noteId, callback)) to editThisNote method on props', () => {
      // Arrange
      const dispatch = jest.fn();
      const callback = jest.fn();

      // Act
      const actual = mapDispatchToProps(dispatch);
      actual.editThisNote('12345', callback);

      // Assert
      expect(pageActions.editNote).toHaveBeenCalledWith('12345', callback);
      expect(dispatch).toHaveBeenCalledWith('MockedEditNoteAction');
    });
  });
});
