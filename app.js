import express from 'express'
import db from './mongodb/db'
import router from './routes/index'
import ScheduleComponent from './service/scheduleComponent'


// console.log(ScheduleComponent)
ScheduleComponent.goschedule()

const app = express();

app.all('*', (req, res, next) => {
    // console.log(req.query)
    next();
});

router(app)


app.listen(8081, () => {
    console.log("成功监听端口：8080")
});