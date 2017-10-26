import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './App.css';

import { getNotes } from '../actions';

export class NotesList extends Component {
  componentWillMount() {
    this.props.getAllNotes();
  }

  render() {
    let { notesList = [] } = this.props;

   return (
      <div className="notes-list">
        <h1>Notes List</h1>
        <div className="toolbar">
          <Link to={`/note/new`}>
            <input type="button" value="Add New Note" className="add-button"></input>
          </Link>
        </div>
        {notesList && notesList.map((note, index) => {
          return (
            <div key={index} className="notes-item">
              <Link to={`/notes/${note.id}`}>
                <h2>{note.title}</h2>
              </Link>
              <p>{note.body}</p>
            </div>
          )
        })
        }
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    notesList: state.notes
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getAllNotes: () => dispatch(getNotes())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
