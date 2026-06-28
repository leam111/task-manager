import express from 'express'
import prisma from '../prismaClient.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.use(authMiddleware)

// GET all tasks
router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.userId }
  })
  res.json(tasks)
})

// CREATE task
router.post('/', async (req, res) => {
  const { title, description } = req.body
  const task = await prisma.task.create({
    data: { title, description, userId: req.userId }
  })
  res.status(201).json(task)
})

// UPDATE task (mark done)
router.patch('/:id', async (req, res) => {
  const task = await prisma.task.update({
    where: { id: parseInt(req.params.id) },
    data: { done: req.body.done }
  })
  res.json(task)
})

// DELETE task
router.delete('/:id', async (req, res) => {
  await prisma.task.delete({
    where: { id: parseInt(req.params.id) }
  })
  res.json({ message: 'Task deleted' })
})

export default router