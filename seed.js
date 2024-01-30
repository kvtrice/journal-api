import { CategoryModel, EntryModel, closeConnection } from './db.js'

// Categories Array
const categories = [
    {
        "name": "Food"
    },
    {
        "name": "Coding"
    },
    {  
        "name": "Gaming"
    },
    {
        "name": "Other"
    }
]

// Seed Categories Data
// Delete all existing data
await CategoryModel.deleteMany()

// Insert new data
const cats = await CategoryModel.insertMany(categories)

// Entries Array
const entries = [
    {
        category: cats[0], 
        content: 'Pizza is yummy!'
    },
    {
        category: cats[1], 
        content: 'Coding is fun!'
    },
    {
        category: cats[2], 
        content: 'Skyrim is for Nords'
    }
]

// Seed Entries Data
// Delete all existing data
await EntryModel.deleteMany()

// Insert new data
await EntryModel.insertMany(entries)

closeConnection()