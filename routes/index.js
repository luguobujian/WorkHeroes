import checkin from './checkin'

export default app => {
    app.use('/checkin', checkin)
}