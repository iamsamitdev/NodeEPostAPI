// สร้าง server ด้วย express
const express = require('express')

// สร้าง express app
const app = express()

// ใช้ express middleware สำหรับการ parse ข้อมูลที่เป็น json
app.use(express.json())

import userRoutes from './routes/userRoutes.js'
// const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

// Use Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

// Start server ที่ port 3000
app.listen(3000, () => {
  console.log('Server is running at port 3000')
})
