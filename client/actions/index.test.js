import * as pageActions from './index';
import * as apiHelper from '../utils/apiHelper';

jest.mock('../utils/apiHelper', () => {
  return {
    getNotes: jest.fn(() => Promise.resolve('MockedNotes')),
    getNote: jest.fn(() => Promise.resolve('MockedNote')),
    deleteNote: jest.fn(() => Promise.resolve({})),
    editNote: jest.fn(() => Promise.resolve({})),
    saveNote: jest.fn(() => Promise.resolve({}))
  };
});


describe('client/actions/index.js', () => {
  it('setNotes', () => {
    // Arrange
    const inputNotes = [ {foo: 'bar'}, {bar: 'baz'} ];
    const expected = {
      type: pageActions.SET_ALL_NOTES,
      notes: inputNotes
    };
    // Act
    const actual = pageActions.setNotes(inputNotes);

    // Assert
    expect(actual).toEqual(expected);
  });

  it('setSelectedNote', () => {
    // Arrange
    const inputNotes = {foo: 'bar'};
    const expected = {
      type: pageActions.SET_SELECTED_NOTE,
      selectedNote: inputNotes
    };
    // Act
    const actual = pageActions.setSelectedNote(inputNotes);

    // Assert
    expect(actual).toEqual(expected);
  });

  it('getNotes', (done) => {
    // Arrange
    const expectedAction = { notes: 'MockedNotes', type: 'SET_ALL_NOTES'};
    const dispatch = jest.fn();

    // Act
    pageActions.getNotes()(dispatch)
      .then(() => {
        // Assert
        expect(dispatch).toHaveBeenCalledWith(expectedAction);
        done();
      })
      .catch(err => {
        done(new Error(err));
      });
  });

  it('getNote', (done) => {
    // Arrange
    const expectedAction = { selectedNote: 'MockedNote', type: 'SET_SELECTED_NOTE'};
    const dispatch = jest.fn();

    // Act
    pageActions.getNote(12345)(dispatch)
      .then(() => {
        // Assert
        expect(dispatch).toHaveBeenCalledWith(expectedAction);
        done();
      })
      .catch(err => {
        done(new Error(err));
      });
  });

  it('deleteNote', (done) => {
    // Arrange
    const dispatch = jest.fn();
    const callback = jest.fn();

    // Act
    pageActions.deleteNote(12345, callback)(dispatch)
      .then(() => {
        // Assert
        expect(callback).toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
        done();
      })
      .catch(err => {
        done(new Error(err));
      });
  });

  it('editNote', (done) => {
    // Arrange
    const dispatch = jest.fn();
    const callback = jest.fn();

    // Act
    pageActions.editNote(12345, callback)(dispatch)
      .then(() => {
        // Assert
        expect(callback).toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
        done();
      })
      .catch(err => {
        done(new Error(err));
      });
  });

  it('saveNote', (done) => {
    // Arrange
    const dispatch = jest.fn();
    const callback = jest.fn();

    // Act
    pageActions.saveNote(12345, callback)(dispatch)
      .then(() => {
        // Assert
        expect(callback).toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
        done();
      })
      .catch(err => {
        done(new Error(err));
      });
  });
});
