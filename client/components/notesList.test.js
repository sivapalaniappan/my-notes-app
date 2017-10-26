import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import NotesListConnected, { NotesList, mapStateToProps, mapDispatchToProps } from './notesList';
import { Link } from 'react-router-dom';

jest.mock('react-router-dom');
Link.mockImplementation(() => {
  return {
    render: jest.fn(
      () => <div>mock</div>
    )
  }
});

// import * as pageActions from '../actions';
// jest.mock('../actions');
// pageActions.getAllNotes.mockImplementation(() => {});

describe('client/components/notesList', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // describe.skip('connected components', () => {
  //   it.skip('renders without crashing', () => {
  //     // Arrange
  //     const store = {
  //       getState: jest.fn().mockImplementation( () => ({ notes: [{id: '123', title: '456'}, {id: '13', title: '456'}] }) ),
  //       dispatch: jest.fn(),
  //       subscribe: jest.fn()
  //     };
  //     const props = {
  //       getAllNotes: jest.fn()
  //     };
  //
  //     // Act
  //     const wrapper = shallow(<NotesListConnected store={store} {...props} />);
  //     const divNode = wrapper.children();
  //     // const
  //     // const notesListItemNode = wrapper.children().getElements()[2];
  //     // const newNoteButtonNode = wrapper.children().getElements()[1];
  //
  //     // Assert
  //     expect(wrapper.html()).toEqual('<div class=\"NotesList\"><h1>NotesList</h1><div>mock</div><div>mock</div><div>mock</div></div>');
  //     expect(divNode).toBe(1);
  //   });
  // });

  describe('<NotesList />', () => {
    let props;
    beforeEach(() => {
      props = {
        getAllNotes: jest.fn(),
        notesList: [{id: 123456, title: 'foo'}]
      };
    });

    afterEach(() => {});

    it('should render successfully with known good data', () => {
      // Arrange
      const store = {
        getState: jest.fn().mockImplementation( () => ({ notes: [] }) ),
        dispatch: jest.fn(),
        subscribe: jest.fn()
      };
      const instance = shallow(<NotesList store={store} {...props} />).instance();

      // Act
      const actual = instance.render();
      const headingNode = actual.props.children[0];
      const newNoteButtonNode = actual.props.children[1].props.children;
      const notesList = actual.props.children[2];
      const notesListItem = notesList[0].props.children;
      const noteItemNode = noteListItems[0].props.children;

      // Assert
      expect(actual.type).toBe('div');
      expect(actual.props.className).toBe('notes-list');
      expect(headingNode.type).toBe('h1');
      expect(headingNode.props.children).toBe('Notes List');
      expect(newNoteButtonNode.props.to).toBe('/note/new');
      expect(newNoteButtonNode.props.children).toEqual(<input className="add-button" type="button" value="Add New Note" />);
      expect(noteItemNode.props.to).toBe('/notes/123456');
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
    it('should return an object with getAllNotes', () => {
      // Arrange
      const dispatch = jest.fn();
      const expected = {
        getAllNotes: () => dispatch(getNotes())
      };

      // Act
      const actual = mapDispatchToProps(dispatch);
      actual.getAllNotes();

      // Assert
      expect(actual).toEqual(expected);
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
