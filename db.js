import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

try {
	const m = await mongoose.connect(process.env.DB_URI)
    console.log(m.connection.readyState === 1 ? 'MongoDB Connected!' : 'MongoDB Failed to connect')
}
catch (err) {
	console.error(err)
}

// Disconnect Handler
process.on('SIGTERM', async () => {
    await mongoose.disconnect()
})

const closeConnection = () => {
    console.log('Mongoose disconnecting')
    mongoose.disconnect()
}

// Categories Schema
const categoriesSchema = new mongoose.Schema({
    name: { type: String, required: true }
})

// Category Model
const CategoryModel = mongoose.model('Category', categoriesSchema)

// Entries Schema
const entriesSchema = new mongoose.Schema({
    category: { type: mongoose.ObjectId, ref: 'Category' }, // The second parameter is the model name (in this case Category)
    content: { type: String, required: true }
})

// Entries model screated based on the schema
const EntryModel = mongoose.model('Entry', entriesSchema)


// Export
export { closeConnection, EntryModel, CategoryModel }