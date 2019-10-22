import BaseComponent from './baseComponent'

export default class AllDataComponent extends BaseComponent {
    constructor() {
        super()
        this.corpid = 'ww265154a3d595f709'
        this.corpsecret = '9LBKGoCOt3GN8gJs2lTIpjKRuWGVbgLiUrqn0UXo33A'
        this.access_token = ''
    }

    async getAccessToken() {
        const resObj = await this.fetch('https://qyapi.weixin.qq.com/cgi-bin/gettoken', {
            corpid: this.corpid,
            corpsecret: this.corpsecret
        })
        if (resObj.errcode == 0) {
            return resObj.access_token
        } else {
            throw new Error('access_token获取失败')
        }
    }

    async getDepartments(accessToken) {
        const resObj = await this.fetch('https://qyapi.weixin.qq.com/cgi-bin/department/list', {
            access_token: accessToken,
            id: ''
        })
        console.log(resObj)
    }

    async getUsers() {
        const accessToken = await this.getAccessToken()
        const departments = await this.getDepartments(accessToken)

        const resObj = await this.fetch('https://qyapi.weixin.qq.com/cgi-bin/user/list', {
            access_token: accessToken,
            department_id: 1,
            fetch_child: 1
        })

        console.log(resObj)
    }
}