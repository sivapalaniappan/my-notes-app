import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import NotesListConnected, { NotesList, mapStateToProps, mapDispatchToProps } from './notesList';

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
pageActions.getNotes.mockImplementation(() => 'MockedGetNotesAction');

describe('client/components/notesList', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('NotesListConnected', () => {
    let store, props;

    beforeEach(() => {
      store = {
        getState: jest.fn().mockImplementation( () => ({ notes: [{id: '123', title: '456'}] }) ),
        dispatch: jest.fn(),
        subscribe: jest.fn()
      };
      props = {
        getAllNotes: jest.fn()
      };
    });

    it('renders successfully with known good data', () => {
      // Arrange
      const expected = '<div class=\"notes-list\"><h1>Notes List</h1><div class=\"toolbar\"><div>MockedLink</div></div><div class=\"notes-item\"><div>MockedLink</div><p></p></div></div>';

      // Act
      const wrapper = shallow(<NotesListConnected store={store} {...props} />);

      // Assert
      expect(wrapper.html()).toEqual(expected);
    });

    it('renders without crashing when notes property is not present in state', () => {
      // Arrange
      store.getState = jest.fn().mockImplementation( () => ({ foo: 'bar' }) );
      const expected = '<div class=\"notes-list\"><h1>Notes List</h1><div class=\"toolbar\"><div>MockedLink</div></div></div>';

      // Act
      const wrapper = shallow(<NotesListConnected store={store} {...props} />);

      // Assert
      expect(wrapper.html()).toEqual(expected);
    });
  });

  // Doing this type of checking here so that we can ensure expected props are passed on to the mocked components
  describe('<NotesList />', () => {
    let props, store;

    beforeEach(() => {
      props = {
        getAllNotes: jest.fn(),
        notesList: [{id: 123456, title: 'foo', body: 'bar' }]
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
        newNoteUrl: '/note/new',
        buttonNode: (<input className="add-button" type="button" value="Add New Note" />),
        noteTitleNode: (<h2>foo</h2>),
        noteDetailsUrl: '/notes/123456',
        noteBodyNode: (<p>bar</p>)
      };
      const instance = shallow(<NotesList store={store} {...props} />).instance();

      // Act
      const actual = instance.render();

      const headingNode = actual.props.children[0];
      const newNoteButtonNode = actual.props.children[1].props.children;

      const notesListItem1 = actual.props.children[2][0];
      const noteTitleNode = notesListItem1.props.children[0];
      const noteBodyNode = notesListItem1.props.children[1];

      // Assert
      expect(actual.type).toBe('div');
      expect(actual.props.className).toBe('notes-list');

      expect(headingNode.type).toBe('h1');
      expect(headingNode.props.children).toBe('Notes List');

      expect(newNoteButtonNode.props.to).toBe(expected.newNoteUrl);
      expect(newNoteButtonNode.props.children).toEqual(expected.buttonNode);

      expect(notesListItem1.props.className).toEqual('notes-item');
      expect(noteTitleNode.props.to).toBe(expected.noteDetailsUrl);
      expect(noteTitleNode.props.children).toEqual(expected.noteTitleNode);
      expect(noteBodyNode).toEqual(expected.noteBodyNode);

      expect(props.getAllNotes).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with notesList value from the state.notes', () => {
      // Arrange
      const inputState = {
        notes: [{ foo: 'bar' }]
      };
      const expected = {
        notesList: [{ foo: 'bar' }]
      };

      // Act
      const actual = mapStateToProps(inputState);

      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should map dispatch(getNotes()) to getAllNotes method on props', () => {
      // Arrange
      const dispatch = jest.fn();
      const expected = {
        getAllNotes: () => dispatch(getNotes())
      };

      // Act
      const actual = mapDispatchToProps(dispatch);
      actual.getAllNotes();

      // Assert
      expect(dispatch).toHaveBeenCalledWith('MockedGetNotesAction');
    });
  });
});
