const { response } = require("express");
const fs = require("fs");
const util = require("util");
const { v4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }
  write(notes) {
    return writeFileAsync("db/db.json", JSON.stringify(notes));
  }

  getNotes() {
    return this.read().then((notes) => {
      return JSON.parse(notes);
    });
  }

  addNote(note) {
    note.id = v4();
    return this.getNotes()
      .then((notes) => {
        notes.push(note);
        return notes;
      })
      .then((allNotes) => {
        return this.write(allNotes);
      })
      .then(() => {
        return note;
      }) 
  }
  deleteNote(id) {
    this.getNotes()
    .then((allNotes) => {
        return allNotes.filter((note) => note.id !== id)
    })
    .then((allNotes) => {
        return this.write(allNotes);
    })
  }
}

module.exports = new Store();
