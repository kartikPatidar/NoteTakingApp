const fs = require('fs')

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
        console.log('New note has been added.')
    }
    else{
        console.log('Note title already exixts.')
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
    addNote : addNote
}