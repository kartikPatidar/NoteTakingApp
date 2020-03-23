const chalk = require('chalk')
//const validator = require('validator')
const notes = require('./notes.js')
const yargs = require('yargs')
const fs = require('fs')


//Customize yargs version
yargs.version('1.1.0')

//Create add command
yargs.command({
    command: 'add',
    describe: 'Adds a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption : true,// To make it compulsary to provide title.
            type : 'string' // to make sure the title is in string format rather than boolean which is default.
        },
        body: {
            describe: 'Note boby',
            demandOption: true,
            type : 'string'
        }
    },
    handler: function (argv){
        notes.addNote(argv.title, argv.body)
    }
})

//Create Remove command
yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    handler: function(){
        console.log("Renoving the note...")
    }
})

//Create list command
yargs.command({
    command: 'list',
    describe: 'list of all notes',
    handler: function(){
        console.log('List is as follows: ...')
    }
})

// Create Read command
yargs.command({
    command: 'read',
    describe: 'To read the note',
    handler:function(){
        console.log("Reading the note...")
    }
})

yargs.parse()
