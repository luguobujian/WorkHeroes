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

        // const tCheckinSort = await ChenkinModel.aggregate([
        //     { $group: { _id: "$userid", min_checkin_time: { $min: "$checkin_time" }, exception_type: { $push: "$exception_type" } } },
        //     { $project: { "_id": 0, "userid": "$_id", "checkin_time": "$min_checkin_time", "exception_type": "$exception_type" } },
        //     { $sort: { checkin_time: 1 } }
        // ])
        // console.log(tCheckinSort)
        let resData = []

        // for (let i = 0; i < tCheckinSort.length; i++) {
        //     for (let j = 0; j < users.length; j++) {
        //         let item = tCheckinSort[i]
        //         let item2 = users[j]
        //         if (item.userid === item2.userid) {
        //             resData.push({
        //                 userid: item2.userid,
        //                 name: item2.name,
        //                 position: item2.position,
        //                 mobile: item2.mobile,
        //                 gender: item2.gender,
        //                 email: item2.email,
        //                 avatar: item2.avatar,
        //                 telephone: item2.telephone,
        //                 qr_code: item2.qr_code,
        //                 alias: item2.alias,
        //                 address: item2.address,
        //                 exception_type: item.exception_type,
        //                 checkin_time: item.checkin_time,
        //                 checkin_date_format: monent(item.checkin_time * 1000).format("YYYY-MM-DD"),
        //                 checkin_time_format: monent(item.checkin_time * 1000).format("HH:mm:ss")
        //             })
        //             break
        //         }
        //     }
        // }


        const mapper = function () {
            if (!this.today_exception) {
                totalCount++;
            } else {
                totalCount = 0;
            }

            if (totalCount != 0) {
                emit(
                    counter,
                    { _id: this.userid, totalCount: totalCount }
                );
            } else {
                counter++;
            }
        };

        const reducer = function (key, values) {

            var result = { docs: [] };

            values.forEach(function (value) {
                result.docs.push(value._id);
                result.totalCount = value.totalCount;
            });

            return result;

        };

        const cc = ChenkinModel.mapReduce({ mapper, reducer })

        return cc





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