import { EntryModel } from "../db"

// Route to get all journal entries
export const getAllEntries = async (req, res) => {
	res.send(await EntryModel.find().populate('category'))
}

// Route to get a single entry
export const getSingleEntry = async (req, res) => {
    const entry = await EntryModel.findById(req.params.id).populate('category')
    if (entry) {
        res.send(entry)
    } else {
        res.status(404).send({error: 'Entry not found'})
    }
}

// Route to add a new entry
export const createNewEntry = async (req, res) => {
    try {
        const insertedEntry = await EntryModel.create(req.body)
        res.status(201).send(insertedEntry)
    }
    catch (err) {
        res.status(400).send( {error: err.message} )
    }
}

// Route to update an existing entry
export const updateEntry = async (req, res) => {
    try {
        const updatedEntry = await EntryModel.findByIdAndUpdate(req.params.id, req.body, {new : true})
        if (updatedEntry) {
            res.send(updatedEntry)
        } else {
            res.status(400).send({error: "Entry not found"})
        }
    }
    catch (err) {
        res.status(400).send( {error: err.message} )
    }
}

// Route to delete an entry
export const deleteEntry = async (req, res) => {
    try {
        const deletedEntry = await EntryModel.findByIdAndDelete(req.params.id)
        if (deletedEntry) {
            res.send(204)
        } else {
            res.status(400).send({error: "Entry not found"})
        }
    }
    catch (err) {
        res.status(400).send( {error: err.message} )
    }
}