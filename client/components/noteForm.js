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
      <div className="noteFormComponent">
        <span><b>Title:</b> <input type="text" value={this.state.noteTitle} onChange={(ev) => this.updateState(ev, 'TITLE')}/></span>
        <br/>
        <span><b>Body:</b> <input type="text" value={this.state.noteBody} onChange={(ev) => this.updateState(ev, 'BODY')}/></span>
        <br/>
        {this.state.isError &&
            <span>Please Enter all missing fields</span>
        }
        <br/>
        <input type="button" value="Save" onClick={(ev) => this.saveNote(ev, pageType)} />
        <input type="button" value="Clear" onClick={(ev) => this.updateState(ev, 'CLEAR')} />
        <input type="button" value="Cancel" onClick={this.props.history.goBack} />
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
