const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find( (note) => title === note.title )
     
    if(!duplicateNote){
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

const readNote = (title) => {
    const notes = loadNotes()
    const matchednote = notes.find( (note) => note.title === title )

    if(matchednote){
        console.log(chalk.cyan.bold(matchednote.title))
        console.log(matchednote.body)
    } else {
        console.log(chalk.red.inverse('Note dosen\'t exist.'))
    }
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
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}