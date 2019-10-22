import AllDataComponent from '../prototype/allDataComponent'
import schedule from 'node-schedule'

class ScheduleComponent extends AllDataComponent {
    constructor() {
        super()

    }
    goschedule() {
        const rule = new schedule.RecurrenceRule();
        // rule.hour = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        // rule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
        // rule.second = [0, 10, 20, 30, 40, 50];
        // schedule.scheduleJob(rule, function () {
        console.log("执行任务：" + new Date());
        // console.log(this)
        this.getUsers()
        // });
    }
}

export default new ScheduleComponent



