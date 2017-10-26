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
    let { notesList } = this.props;

    return (
      <div className="NotesList">
        <h1>NotesList</h1>
        <Link to={`/note/new`}>
          <input type="button" value="Add New Note"></input>
        </Link>
        {notesList && notesList.map((note, index) => {
          return (
            <Link key={index} to={`/notes/${note.id}`}>
              <h2>{note.title}</h2>
            </Link>
          )
        })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notesList: state.notes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllNotes: () => dispatch(getNotes())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
