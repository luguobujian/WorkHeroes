import BaseComponent from './baseComponent'
import CheckAllDataComponent from '../service/checkAllDataComponent'
import UserModel from '../models/user/user'
import moment from 'moment'

const checkAllData = new CheckAllDataComponent()

export default class AllDataComponent extends BaseComponent {
    constructor() {
        super()
        this.wx_localhost = 'https://qyapi.weixin.qq.com/cgi-bin/'
        this.corpid = 'ww265154a3d595f709'
        this.corpsecret = '9LBKGoCOt3GN8gJs2lTIpjKRuWGVbgLiUrqn0UXo33A'
        this.checkinid = '3010011'
        this.checkinsecret = 'BS2Dgk10kl7lIpXsu_k8RUj03ViqYzqG3OPvAvm6q_U'
        this.access_token = ''
    }

    async getAccessToken(id, secret) {
        const resObj = await this.fetch(this.wx_localhost + 'gettoken', {
            corpid: id,
            corpsecret: secret
        })
        // console.log(resObj)
        if (resObj.errcode === 0) {
            return resObj.access_token
        } else {
            throw new Error('access_token获取失败')
        }
    }

    async getDepartments(accessToken) {
        const resObj = await this.fetch(this.wx_localhost + 'department/list', {
            access_token: accessToken,
            id: ''
        })
        if (resObj.errcode === 0) {
            checkAllData.checkDepartment(resObj.department)
        } else {
            throw new Error('department获取失败')
        }

        // console.log(resObj)
    }

    async getUsers() {
        const accessToken = await this.getAccessToken(this.corpid, this.corpsecret)
        const departments = await this.getDepartments(accessToken)

        const resObj = await this.fetch(this.wx_localhost + 'user/list', {
            access_token: accessToken,
            department_id: 1,
            fetch_child: 1
        })

        if (resObj.errcode === 0) {
            checkAllData.checkUser(resObj.userlist)
        } else {
            throw new Error('user获取失败')
        }
        // console.log(resObj)
    }


    async getCheckindata() {
        const accessToken = await this.getAccessToken(this.corpid, this.checkinsecret)
        const allUsers = await UserModel.find({}, '-_id -__v')

        const useridlist = []

        allUsers.forEach(item => {
            useridlist.push(item.userid)
        });

        console.log(moment().startOf('day').unix())
        const starttime = moment().startOf('day').unix()
        const endtime = moment().endOf('day').unix()
        // console.log(useridlist)
        const resObj = await this.fetch(this.wx_localhost + 'checkin/getcheckindata?access_token=' + accessToken, {
            opencheckindatatype: 3,
            starttime,
            endtime,
            useridlist
        }, 'post')

        if (resObj.errcode === 0) {
            checkAllData.checkCheckin(resObj.checkindata)
        } else {
            throw new Error('checkin获取失败')
        }
        // console.log(resObj)
    }
}