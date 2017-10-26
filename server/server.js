const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const low = require('lowdb');
const logger = require('morgan');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('./db.json');
const moment = require('moment');

module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, '../index.html');
    const stylePath = path.join(__dirname, '../index.css');
    const publicPath = express.static(path.join(__dirname, '../dist'));

    app.use(logger('dev'));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/dist', publicPath);

    app.get('/api/notes', (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      low(adapter)
        .then(db => {
          const notes = db.get('notes').value();

          res.json(notes);
        });
    });

    app.get('/api/note/:noteId', (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      low(adapter)
        .then(db => {
          const note = db.get('notes')
            .find({ id: req.params.noteId })
            .value()

          res.json(note);
        });
    });

    app.delete('/api/note/:noteId', (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      low(adapter)
        .then(db => {
          db.get('notes')
            .remove({ id: req.params.noteId })
            .write()
            .then(() => res.send('Deleted Successfully'))
        });
    });

    app.put('/api/note/:noteId', (req, res) => {
      const updatedNote = req.body;
      updatedNote.updateDate = moment().format('MMMM Do YYYY, h:mm:ss a');
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      low(adapter)
        .then(db => {
          db.get('notes')
            .find({ id: req.params.noteId })
            .assign(updatedNote)
            .write()
            .then(() => res.send('Updated Successfully'))
        });
    });

    app.post('/api/saveNote', (req, res) => {
      const newNote = req.body;
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      low(adapter)
        .then(db => {
          db.get('notes')
            .push(newNote)
            .last()
            .assign({ id: Date.now().toString() })
            .assign({ createDate: moment().format('MMMM Do YYYY, h:mm:ss a') })
            .assign({ updateDate: moment().format('MMMM Do YYYY, h:mm:ss a') })
            .write()
            .then(note => res.json(note))
        });
    });

    app.get('/', function (_, res) { res.sendFile(indexPath) });
    app.get('/index.css', function (_, res) { res.sendFile(stylePath) });

    return app;
  }
}
