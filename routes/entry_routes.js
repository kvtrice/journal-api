import { Router } from 'express'
import * as EntryController from '../controllers/entryController.js'

const router = Router()

// GET / READ
router.get('', EntryController.getAllEntries)

router.get('/:id', EntryController.getSingleEntry)

// POST / CREATE
router.post('', EntryController.createNewEntry)

// PUT / UPDATE
router.put('/:id', EntryController.updateEntry)

// DELETE
router.delete('/:id', EntryController.deleteEntry)

export default router