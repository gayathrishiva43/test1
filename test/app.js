require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Item = require('./itemModel')

app.get('/', async (req, res) => {
  const result = await Item.find({
    brand: 'TATA',
    gender: 'male',
    color: 'black',
    category: 'industrial',
  }).limit(20)
  return res
    .status(200)
    .json({ success: true, data: { count: result.length, result } })
})

app.get('/:id', async (req, res) => {
  const { id } = req.params
  const result = await Item.findById(id)
  return res.status(200).json({ success: true, data: result })
})

const port = 3000

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'shop',
    })
    console.log('Connected to the DB...')
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
