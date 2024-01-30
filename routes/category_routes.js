import { Router } from 'express'
import { CategoryModel } from '../db.js'

const router = Router()

// Route to get journal categories
router.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

export default router