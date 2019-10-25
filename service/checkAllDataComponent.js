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
        if (departmentsData.length <= 0) return
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
        const usersData = await DepartmentModel.find({})
        if (usersData.length <= 0) return

        data.forEach((item, idx) => {
            const newUserOne = new UserModel(item)
            newUserOne.save()
        })
    }

    async checkCheckin(arr) {
        // console.log(data)
        // const allCheckin = await CheckinModel.find({})
        // console.log(allCheckin.length)
        // // if (allCheckin.length <= 0) return
        // console.log(allCheckin)
        // data.forEach((item, idx) => {
        //     item.checkin_date = moment(item.checkin_time * 1000).format('YYYY-MM-DD')
        //     const newCheckinOne = new CheckinModel(item)
        //     newCheckinOne.save()
        // })
    }


    isObjEqual(o1, o2) {
        const props1 = Object.getOwnPropertyNames(o1);
        const props2 = Object.getOwnPropertyNames(o2);
        if (props1.length != props2.length) {
            return false;
        }
        for (const i = 0, max = props1.length; i < max; i++) {
            const propName = props1[i];
            if (o1[propName] !== o2[propName]) {
                return false;
            }
        }
        return true;
    }
}
