import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { getNote, deleteNote } from '../actions';

export class Note extends Component {
  componentWillMount() {
    let noteId = _.get(this, 'props.match.params.noteId') || '';
    this.props.getNoteToDisplay(noteId);
  }

  deleteThisNote(ev, noteId) {
    ev.preventDefault();
    this.props.deleteCurrentNote(noteId, () => {
      this.props.history.push('/');
    });
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

export const mapStateToProps = (state) => {
  return {
    note: state.selectedNote
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getNoteToDisplay: (noteId) => dispatch(getNote(noteId)),
    deleteCurrentNote: (noteId, callback) => dispatch(deleteNote(noteId, callback))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
