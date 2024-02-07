import express from 'express'
import entryRoutes from './routes/entry_routes.js'
import categoryRoutes from './routes/category_routes.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

// Index route
app.get('/', (req, res) => res.send({info: "Journal API"}))

// Category Routes Router
app.use(categoryRoutes)

// Entry Routes Router
app.use('/entries', entryRoutes)

// Listen
app.listen(4000)