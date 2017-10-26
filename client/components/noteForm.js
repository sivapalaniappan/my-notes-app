import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getNote, editNote, saveNote } from '../actions';

class NoteForm extends Component {
  setInitialState (noteId= '', noteTitle='', noteBody='') {
    this.setState({
      noteId,
      noteTitle,
      noteBody
    });
  };

  updateState (ev, type) {
    ev.preventDefault();
    switch (type) {
      case 'TITLE':
        this.setState({ noteTitle: ev.target.value });
        break;
      case 'BODY':
        this.setState({ noteBody: ev.target.value });
        break;
      case 'CLEAR':
        this.setInitialState();
        break;
      default:
        break;
    }
  };

  isValidInput (text) {
    if(text.trim().length > 0) {
      return true;
    }
    else {
      return false;
    }
  };

  saveNote (ev, pageType) {
    ev.preventDefault();

    let id = _.get(this, 'state.noteId').trim() || '';
    let title = _.get(this, 'state.noteTitle').trim() || '';
    let body = _.get(this, 'state.noteBody').trim() || '';

    if (title && body) {
      const newNote = {
        id,
        title,
        body
      };
      if(pageType === 'edit') {
        this.props.editThisNote(newNote);
      }
      else {
        this.props.saveThisNote(newNote);
      }
    }
    else {
      this.setState({ isError: true });
    }
  };

  componentWillMount() {
    this.setInitialState();
    const noteId = _.get(this, 'props.location.query.noteId') || '';
    const isExistingNote = noteId ? true : false;
    if(isExistingNote) {
      this.props.getNoteToEdit(noteId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { note = {} } = nextProps;

    if(note && Object.keys(note).length > 0) {
      this.setInitialState(note.id, note.title, note.body);
    }
  }

  render() {
    const pageType = _.get(this, 'props.match.params.type');

   return (
      <div className="note-form">
        <h1>Add New Note</h1>
        <div className="noteFormComponent">
          <label>Title: </label>
          <input type="text" value={this.state.noteTitle} onChange={(ev) => this.updateState(ev, 'TITLE')}/>

         <label>Body: </label>
         <textarea rows="6" value={this.state.noteBody} onChange={(ev) => this.updateState(ev, 'BODY')}>
         </textarea>

         {this.state.isError &&
              <span>Please Enter all missing fields</span>
          }
          <br/>
          <div className="toolbar">
            <input type="button" value="Save" onClick={(ev) => this.saveNote(ev, pageType)} className="add-button"/>
            <input type="button" value="Clear" onClick={(ev) => this.updateState(ev, 'CLEAR')} className="edit-button"/>
            <input type="button" value="Cancel" onClick={this.props.history.goBack} className="delete-button"/>
          </div>
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
    getNoteToEdit: (noteId) => dispatch(getNote(noteId)),
    saveThisNote: (note) => dispatch(saveNote(note)),
    editThisNote: (note) => dispatch(editNote(note))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
