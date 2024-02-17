// สร้าง server ด้วย express
const express = require('express')

// สร้าง express app
const app = express()

// สร้าง route ที่ path / และส่งข้อความ Hello World! กลับไป
// Method: GET
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Method: POST
app.post('/post', (req, res) => {
  res.send('Got a POST request')
})

// Method: PUT
app.put('/put', (req, res) => {
  res.send('Got a PUT request')
})

// Method: DELETE
app.delete('/delete', (req, res) => {
  res.send('Got a DELETE request')
})

// Start server ที่ port 3000
app.listen(3000, () => {
  console.log('Server is running at port 3000')
})
