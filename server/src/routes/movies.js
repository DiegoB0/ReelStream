const express = require('express');
const movieController = require('../controllers/movieController');
const router = express.Router();

router.post('/favorites/:userId', movieController.postMovie);
router.get('/favorites/:userId', movieController.getMovies);
router.delete('/favorites/:userId/:movieId', movieController.deleteMovie);

module.exports = router;
