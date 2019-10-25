import mongoose from 'mongoose'

const Schema = mongoose.Schema

const departmentSchema = new Schema({
    id: Number,
    name: String,
    parentid: Number,
    order: Number,
    usable: { type: Number, default: 1 },
    available: { type: Number, default: 1 }
})

departmentSchema.index({ id: 1 })

const Department = mongoose.model('Depertment', departmentSchema)

export default Department