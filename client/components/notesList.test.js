import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import NotesListConnected, { NotesList } from './notesList';

it('renders without crashing', () => {
  // Arrange
  const div = document.createElement('div');
  const props = {
    getAllNotes: jest.fn(),
    notesList: []
  };
  const noteList = new NotesList();


  // Act
  // const wrapper = shallow(<NotesListConnected {...props} />);
  //
  // // Assert
  // expect(wrapper).toBe(1);
  ReactDOM.render(<NotesList {...props} />, div);
});
