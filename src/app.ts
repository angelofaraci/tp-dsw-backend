import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { reviewRouter } from './review/review.routes.js'
import { gameRouter } from './game/game.routes.js'
import { userRouter } from './user/user.routes.js'
import { adminRouter } from './admin/admin.routes.js'
import { levelingRouter } from './leveling/leveling.routes.js'




//database initialization

mongoose.connect('mongodb://localhost/tp-database', {

})
    .then(db => console.log('Database is Connected'))
    .catch(err => console.log(err))

const app = express()
app.use(cors())
app.use(express.json())



//routers

app.use('/api/reviews', reviewRouter)
app.use('/api/games', gameRouter)
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/leveling', levelingRouter)


//sever start

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})
