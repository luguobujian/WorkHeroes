import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    userid: String,
    name: String,
    department: [],
    order: [],
    position: String,
    mobile: String,
    gender: String,
    email: String,
    is_leader_in_dept: [],
    avatar: String,
    telephone: String,
    enable: { type: Number, default: 1 },
    alias: String,
    status: { type: Number, default: 1 },
    address: String,
    extattr: {
        attrs: []
    },
    qr_code: String,
    external_position: String,
    external_profile: {
        external_corp_name: String,
        external_attr: []
    }
})

userSchema.index({ id: 1 })

const UserModel = new mongoose.model('User', userSchema)

export default UserModel
