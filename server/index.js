import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import providerRoutes from './routes/providers.js'

dotenv.config()

const app = express()

app.use(express.json({limit: '30mb', extended: 'true'}))
app.use(express.urlencoded({limit: '30mb', extended: 'true'}))
app.use(cors())

app.use('/api/providers', providerRoutes)

app.get('/', (req, res) => {
    res.send('This is the my_provider api')
})

const PORT = process.env.PORT || 5000
const DB_CONNECT = process.env.MONGO_URI

mongoose.connect(DB_CONNECT, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

