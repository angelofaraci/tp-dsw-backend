import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { reviewRouter } from './review/review.routes.js'
import { gameRouter } from './game/game.routes.js'
import { userRouter } from './user/user.routes.js'




//DECLARACION DE LA BASE DE DATOS

mongoose.connect('mongodb://localhost/tp-database', {

})
    .then(db => console.log('Database is Connected'))
    .catch(err => console.log(err))

const app = express()
app.use(cors())
app.use(express.json())



//ENRUTADORES

app.use('/api/reviews', reviewRouter)
app.use('/api/games', gameRouter)
app.use('/api/user', userRouter)


//ARRANQUE DEL SERVIDOR

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})
