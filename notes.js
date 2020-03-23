const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return "Your notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter( (note) => title === note.title )
     
    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body 
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note has been added.'))
    }
    else{
        console.log(chalk.red.inverse('Note title already exixts.'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    const notetokeep = notes.filter( (note) => title !== note.title )

    if ( notetokeep.length < notes.length ){
        saveNotes(notetokeep)
        console.log(chalk.green.inverse('Note removed.'))
    } else {
        console.log(chalk.red.inverse('No note found.'))
    }

}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.magentaBright.bold('Your Notes :'))
    
    notes.forEach(element => {
        console.log(element.title)
    });
}

const saveNotes = (notes) => {
    const JSONnotes = JSON.stringify(notes)
    fs.writeFileSync('notes.json',JSONnotes)
}

const loadNotes = () => {
try{
    const dataBuffer = fs.readFileSync('notes.json')
    const JSONdata = dataBuffer.toString()
    return JSON.parse(JSONdata)
} catch (e) {
    return []
}
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes 
}