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
      <div className="note">
        <h1>{note.title}</h1>
        <div className="toolbar">
          <Link to={{
                    pathname: '/note/edit',
                    query: { noteId: note.id }
                  }}>
            <button className="edit-button">EDIT</button>
          </Link>
          <button onClick={(ev) => this.deleteThisNote(ev, note.id)} className="delete-button">DELETE</button>
        </div>
        <p>{note.body}</p>
        <div>
          <span className="create-time">
            Created: {note.createDate}
          </span>
          <span className="update-time">
            Last Updated: {note.updateDate}
          </span>
        </div>
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
