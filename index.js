const { PrismaClient } = require('@prisma/client');

// สร้าง server ด้วย express
const express = require('express')

// สร้าง express app
const app = express()

// สร้าง prisma client
const prisma = new PrismaClient()

// ใช้ express middleware สำหรับการ parse ข้อมูลที่เป็น json
app.use(express.json())

// Rest API สำหรับอ่านข้อมูล user ทั้งหมด
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

// Rest API สำหรับสร้าง user
app.post('/users', async (req, res) => {
  const { name, email } = req.body
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  })
  res.json(user)
})

// Rest API สำหรับอ่านข้อมูล user ตาม id
app.get('/users/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  res.json(user)
})

// Rest API สำหรับอัพเดทข้อมูล user ตาม id
app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body
  const user = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      email,
    },
  })
  res.json(user)
})

// Rest API สำหรับลบข้อมูล user ตาม id
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.json(user)
})

// Rest API สำหรับอ่านข้อมูล post ทั้งหมด
app.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany()
  res.json(posts)
})

// Rest API สำหรับสร้าง post ใหม่ โดยต้องระบุ authorId ของ user ที่เขียน post ด้วย
app.post('/posts', async (req, res) => {
  const { title, content, authorId } = req.body
  const post = await prisma.post.create({
    data: {
      title,
      content,
      published: true,
      authorId: parseInt(authorId),
    },
  })
  res.json(post)
})

// Rest API สำหรับอ่านข้อมูล post ตาม id
app.get('/posts/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  res.json(post)
})

// Rest API สำหรับอัพเดทข้อมูล post ตาม id
app.put('/posts/:id', async (req, res) => {
  const { id } = req.params
  const { title, content, published } = req.body
  const post = await prisma.post.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      content,
      published,
    },
  })
  res.json(post)
})

// Rest API สำหรับลบข้อมูล post ตาม id
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.json(post)
})

// Rest API ค้นหาข้อมูล post ที่มี title หรือ content จาก keyword ที่ระบุ
app.get('/search/posts', async (req, res) => {
  const { keyword } = req.query
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: keyword,
          },
        },
        {
          content: {
            contains: keyword,
          },
        },
      ],
    },
  })
  res.json(posts)
})


// Start server ที่ port 3000
app.listen(3000, () => {
  console.log('Server is running at port 3000')
})
