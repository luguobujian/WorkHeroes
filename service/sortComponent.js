import BaseComponent from '../prototype/baseComponent'
import UserModel from '../models/user/user'
import ChenkinModel from '../models/checkin/checkin'
import monent from 'moment'

class SortComponent extends BaseComponent {
    constructor() {
        super()
    }

    async todaySort() {
        const usersFind = {
            "_id": 0,
            "userid": 1,
            "name": 1,
            "position": 1,
            "mobile": 1,
            "gender": 1,
            "email": 1,
            "avatar": 1,
            "telephone": 1,
            "qr_code": 1,
            "alias": 1,
            "address": 1
        }
        const users = await UserModel.find({}, usersFind)

        const tCheckinSort = await ChenkinModel.aggregate([
            { $group: { _id: "$userid", min_checkin_time: { $min: "$checkin_time" } } },
            { $project: { "_id": 0, "userid": "$_id", "checkin_time": "$min_checkin_time" } },
            { $sort: { checkin_time: 1 } }
        ])


        tCheckinSort.forEach(item => {
            users.map(item2 => {
                if (item.userid === item2.userid) {
                    item2["checkin_time_format"] = monent(item.checkin_time * 1000).format("HH:mm:ss")
                    console.log(item2)
                }
            })
        })


        return users





        // tCheckinSort.forEach((item, idx) => {
        //     users.forEach((item2, idx2) => {
        //         if (item2.userid === item.userid) {
        //             item2["checkin_time_format"] = monent(item.checkin_time * 1000).format("HH:mm:ss")
        //             console.log(monent(item.checkin_time * 1000).format("HH:mm:ss"))
        //             console.log(item2)
        //             rData.push(item2)
        //         }
        //     })
        // })

        // for (let i = 0; i < tCheckinSort.length; i++) {
        //     for (let j = 0; j < users.length; j++) {
        //         if (tCheckinSort[i].userid === users[j].userid) {
        //             users[j].checkin_time_format = monent(tCheckinSort[i].checkin_time * 1000).format("HH:mm:ss")
        //             console.log(users[j])
        //             rData.push(users[j])
        //             break
        //         }
        //     }
        // }
        // return tCheckinSort
    }
}

export default new SortComponent()