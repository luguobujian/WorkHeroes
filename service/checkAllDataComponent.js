import BaseComponent from '../prototype/baseComponent'
import DepartmentModel from '../models/department/department'
import UserModel from '../models/user/user'
import CheckinModel from '../models/checkin/checkin'
import moment from 'moment'

export default class CheckAllDataComponent extends BaseComponent {
    constructor() {
        super()
    }

    async checkDepartment(data) {
        const departmentsData = await DepartmentModel.find({})

        if (departmentsData.length > 0) return
        // departmentData.forEach((item, idx) => {
        //     const result = data.some((item2, idx2) => {
        //         if (item.id === item2.id) return true
        //     })
        //     if (!result) {
        //         item.usable = 0
        //         item.available = 0
        //         const newDepartmentOne = new DepartmentModel(item)
        //         newDepartmentOne.save()
        //     }
        // })

        data.forEach((item, idx) => {
            const newDepartmentOne = new DepartmentModel(item)
            newDepartmentOne.save()
        })
    }

    async checkUser(data) {
        const delUserConditions = {}
        const usersData = await UserModel.find({})
        if (usersData.length > 0) return
        UserModel.deleteMany(delUserConditions, err => {
            if (err) {
                throw new Error(err)
                return
            } else {
                data.forEach((item, idx) => {
                    const newUserOne = new UserModel(item)
                    newUserOne.save()
                })
            }
        })

    }

    async checkCheckin(data, checkin_date) {
        const exception_type = ['时间异常', '地点异常', '未打卡', 'wifi异常', '非常用设备']
        const delConditions = { checkin_date }
        CheckinModel.deleteMany(delConditions, err => {
            if (err) {
                throw new Error(err)
                return
            }
            data.forEach((item, idx) => {
                let tempData = item.exception_type
                if (exception_type.includes(tempData)) {
                    item.today_exception = true
                }
                item.checkin_date = moment(item.checkin_time * 1000).format('YYYY-MM-DD')
                const newCheckinOne = new CheckinModel(item)
                newCheckinOne.save()
            })
        })
    }

    isException(data) {
        const exception_type = ['时间异常', '地点异常', '未打卡', 'wifi异常', '非常用设备']
        for (let i = 0; i < data.length; i++) {
            let item = data[i]
            if (exception_type.includes(item)) {
                return false
            }
        }
    }
}
