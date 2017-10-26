import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './App.css';

import { getNote, deleteNote } from '../actions';

class NotesList extends Component {
  componentWillMount() {
    let { noteId = '' } = this.props.match.params;
    this.props.getNoteToDisplay(noteId);
  }

  deleteThisNote(ev, noteId) {
    ev.preventDefault();
    this.props.deleteCurrentNote(noteId);
    // this.props.history.push('/');
  };

  render() {
    const { note = {} } = this.props;

    return (
      <div className="Note">
        <h1>Title: {note.title}</h1>
        <h3>Body: {note.body}</h3>
        <br/>
        <h5>Created: {note.createDate} <br/> Updated: {note.updateDate}</h5>
        <Link to={{
                  pathname: '/note/edit',
                  query: { noteId: note.id }
                }}>
          <button>EDIT</button>
        </Link>
        <button onClick={(ev) => this.deleteThisNote(ev, note.id)}>DELETE</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    note: state.selectedNote
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNoteToDisplay: (noteId) => dispatch(getNote(noteId)),
    deleteCurrentNote: (noteId) => dispatch(deleteNote(noteId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
