const fs = require('fs')
const chalk = require('chalk')

const getNotes = function (){
    return "Your notes..."
}

const addNote = function (title, body){
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function(note){
        return title===note.title
    })
     
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

const removeNote = function (title){
    const notes = loadNotes()

    const notetokeep = notes.filter(function(note){
        return title !== note.title
    })

    if ( notetokeep.length < notes.length ){
        saveNotes(notetokeep)
        console.log(chalk.green.inverse('Note removed.'))
    } else {
        console.log(chalk.red.inverse('No note found.'))
    }

}

const saveNotes = function (notes){
    const JSONnotes = JSON.stringify(notes)
    fs.writeFileSync('notes.json',JSONnotes)
}

const loadNotes = function(){
try{
    const dataBuffer = fs.readFileSync('notes.json')
    const JSONdata = dataBuffer.toString()
    return JSON.parse(JSONdata)
} catch (e) {
    return []
}
}

module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    removeNote : removeNote
}