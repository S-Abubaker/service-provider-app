import express from 'express'
import { addProvider, getProviders, deleteProvider, updateProvider } from '../controllers/providers.js'

const router = express.Router()

router.get('/', getProviders)

router.post('/', addProvider)

router.delete('/:id', deleteProvider)

router.patch('/:id', updateProvider)

export default router