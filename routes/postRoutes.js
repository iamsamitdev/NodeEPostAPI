// Initialize express router
const express = require('express')

// Import postController
const postController = require('../controllers/postController')

// Initialize router
const router = express.Router()

// Get all posts
router.get('/', postController.getAllPosts)

// Create a new post
router.post('/', postController.createPost)

// Get a post by id
router.get('/:id', postController.getPostById)

// Update a post by id
router.put('/:id', postController.updatePostById)

// Delete a post by id
router.delete('/:id', postController.deletePostById)

// Search posts
router.get('/search', postController.searchPosts)

// Export the router
module.exports = router
