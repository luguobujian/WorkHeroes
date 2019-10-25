import BaseComponent from '../../prototype/baseComponent'
import SortComponent from '../../service/sortComponent'

class Checkin extends BaseComponent {
    constructor() {
        super()
    }

    async sort(req, res, next) {
        console.log(req.query)
        const data = await SortComponent.todaySort()

        res.send({
            status: 1,
            data
        })
    }

}

export default new Checkin()