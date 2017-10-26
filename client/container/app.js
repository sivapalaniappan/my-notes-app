import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Note from '../components/note';
import NotesList from '../components/notesList';
import NoteForm from '../components/noteForm';

class App extends Component {
  render() {
    return (
      <div className="appContainer">
        <Route exact path="/" component={NotesList} />
        <Route path="/notes/:noteId" component={Note} />
        <Route path="/note/:type" component={NoteForm} />
      </div>
    );
  }
}

export default App;
