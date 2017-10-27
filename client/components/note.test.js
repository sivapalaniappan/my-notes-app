import React from 'react';
import { shallow, mount }  from 'enzyme';
import NoteConnected, { Note, mapStateToProps, mapDispatchToProps } from './note';

import { Link } from 'react-router-dom';
jest.mock('react-router-dom');
// MOCKING THIS HERE SO THAT WE CAN COMPLETELY ISOLATE OUR CODE FROM DEPENDENCIES
Link.mockImplementation(() => {
  return {
    render: jest.fn(
      () => <div>MockedLink</div>
    )
  }
});

import * as pageActions from '../actions';
jest.mock('../actions');
pageActions.getNote.mockImplementation(() => 'MockedGetNoteAction');
pageActions.deleteNote.mockImplementation(() => 'MockedDeleteNoteAction');

describe('client/components/note.js', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('NoteConnected', () => {
    let store, props, note;

    beforeEach(() => {
      note = {
        id: 12345,
        title: 'foo',
        body: 'bar',
        createDate: 'October 26th 2017, 7:17:40 pm',
        updateData: 'October 26th 2017, 8:17:40 pm'
      }
      store = {
        getState: jest.fn().mockImplementation( () => ({ selectedNote: note }) ),
        dispatch: jest.fn(),
        subscribe: jest.fn()
      };
      props = {
        getNoteToDisplay: jest.fn(),
        deleteCurrentNote: jest.fn()
      };
    });

    it('should render successfully with known good data', () => {
      // Arrange
      const expected = '<div class=\"note\"><h1>foo</h1><div class=\"toolbar\"><div>MockedLink</div><button class=\"delete-button\">DELETE</button></div><p>bar</p><div><span class=\"create-time\">Created: October 26th 2017, 7:17:40 pm</span><span class=\"update-time\">Last Updated: </span></div></div>';

      // Act
      const wrapper = shallow(<NoteConnected store={store} {...props} />);

      // Assert
      expect(wrapper.html()).toEqual(expected);
    });

    it('should renders without crashing when selectedNote property is not present in state', () => {
      // Arrange
      store.getState = jest.fn().mockImplementation( () => ({ foo: 'bar' }) );
      const expected = '<div class=\"note\"><h1></h1><div class=\"toolbar\"><div>MockedLink</div><button class=\"delete-button\">DELETE</button></div><p></p><div><span class=\"create-time\">Created: </span><span class=\"update-time\">Last Updated: </span></div></div>';

      // Act
      const wrapper = shallow(<NoteConnected store={store} {...props} />);

      // Assert
      expect(wrapper.html()).toEqual(expected);
    });

    it('should dispatch deleteNote action if DELETE button is clicked', () => {
      // Arrange
      const wrapper = mount(<NoteConnected store={store} {...props} />);

      // Act
      wrapper.find('.delete-button').simulate('click');

      // Assert
      expect(pageActions.deleteNote).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith('MockedDeleteNoteAction');
    });
  });

  // Doing this type of checking here so that we can ensure expected props are passed on to the mocked components
  describe('<Note />', () => {
    let props, store;

    beforeEach(() => {
      props = {
        match: { params: 123456 },
        getNoteToDisplay: jest.fn(),
        deleteCurrentNote: jest.fn(),
        note: {
          id: 123456,
          title: 'foo',
          body: 'bar',
          createDate: 'October 26th 2017, 7:17:40 pm',
          updateDate: 'October 26th 2017, 8:17:40 pm'
        }
      };
      store = {
        getState: jest.fn().mockImplementation( () => ({ notes: [] }) ),
        dispatch: jest.fn(),
        subscribe: jest.fn()
      };
    });

    it('should render successfully with known good data', () => {
      // Arrange
      const expected = {
        editNoteProps: { pathname: "/note/edit", query: {noteId: 123456} },
        editButtonNode: (<button className="edit-button">EDIT</button>),
        noteTitleNode: (<h1>foo</h1>),
        noteBodyNode: (<p>bar</p>),
        createDateNode: (<span className="create-time">Created: October 26th 2017, 7:17:40 pm</span>),
        updateDateNode: (<span className="update-time">Last Updated: October 26th 2017, 8:17:40 pm</span>)
      };
      const instance = shallow(<Note store={store} {...props} />).instance();

      // Act
      const actual = instance.render();
      const headingNode = actual.props.children[0];

      const toolbarNode = actual.props.children[1];
      const editButtonNode = toolbarNode.props.children[0];
      const deleteButtonNode = toolbarNode.props.children[1];

      const noteBodyNode = actual.props.children[2];

      const noteTimeInfoNode = actual.props.children[3];
      const noteCreateTimeNode = noteTimeInfoNode.props.children[0];
      const noteUpdateTimeNode = noteTimeInfoNode.props.children[1];

      // Assert
      expect(actual.type).toBe('div');
      expect(actual.props.className).toBe('note');

      expect(headingNode).toEqual(expected.noteTitleNode);

      expect(toolbarNode.props.className).toBe('toolbar');
      expect(editButtonNode.props.to).toEqual(expected.editNoteProps);
      expect(editButtonNode.props.children).toEqual(expected.editButtonNode);
      expect(deleteButtonNode.props.className).toEqual('delete-button');
      expect(deleteButtonNode.props.children).toEqual('DELETE');

      expect(noteBodyNode).toEqual(expected.noteBodyNode);

      expect(noteCreateTimeNode.props.className).toEqual('create-time');
      expect(noteCreateTimeNode.props.children).toEqual(['Created: ', 'October 26th 2017, 7:17:40 pm']);

      expect(noteUpdateTimeNode.props.className).toEqual('update-time');
      expect(noteUpdateTimeNode.props.children).toEqual(['Last Updated: ', 'October 26th 2017, 8:17:40 pm']);

      expect(props.getNoteToDisplay).toHaveBeenCalledWith(123456);
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with notesList value from the state.notes', () => {
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
    it('should map dispatch(getNote(noteId)) to getNoteToDisplay method on props', () => {
      // Arrange
      const dispatch = jest.fn();

      // Act
      const actual = mapDispatchToProps(dispatch);
      actual.getNoteToDisplay('12345');

      // Assert
      expect(pageActions.getNote).toHaveBeenCalledWith('12345');
      expect(dispatch).toHaveBeenCalledWith('MockedGetNoteAction');
    });

    it('should map dispatch(deleteNote(noteId, callback)) to deleteCurrentNote method on props', () => {
      // Arrange
      const dispatch = jest.fn();
      const callback = jest.fn();

      // Act
      const actual = mapDispatchToProps(dispatch);
      actual.deleteCurrentNote('12345', callback);

      // Assert
      expect(pageActions.deleteNote).toHaveBeenCalledWith('12345', callback);
      expect(dispatch).toHaveBeenCalledWith('MockedDeleteNoteAction');
    });
  });
});
