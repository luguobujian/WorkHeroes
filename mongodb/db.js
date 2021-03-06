import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/workheroes')

const db = mongoose.connection

db.once('open', () => {
    console.log('连接数据库成功')
})

db.on('error', (error) => {
    console.log('Error in MongoDb connection: ' + error)
    mongoose.disconnect();
})

db.on('close', () => {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect('mongodb://localhost:27017/test')
})

export default db