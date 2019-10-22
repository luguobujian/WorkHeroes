import express from 'express'
import ScheduleComponent from './service/scheduleComponent'


// console.log(ScheduleComponent)
ScheduleComponent.goschedule()

const app = express();

app.all('*', (req, res, next) => {
    console.log(req.query)
    next();
});

app.listen(8080, () => {
    console.log("成功监听端口：8080")
});