import mongoose from 'mongoose'

const Schema = mongoose.Schema

const checkinSchema = new Schema({
    userid: String,
    groupname: String,
    checkin_type: String,
    exception_type: String,
    checkin_time: Number,
    checkin_date: String,
    location_title: String,
    location_detail: String,
    wifiname: String,
    notes: String,
    wifimac: String,
    mediaids: [],
    lat: Number,
    lng: Number
})

checkinSchema.index({ id: 1 })

const Checkin = mongoose.model('Checkin', checkinSchema)

export default Checkin