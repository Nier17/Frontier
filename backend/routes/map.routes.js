const express = require('express');
const router = express.Router();

const mapController = require('../controllers/mapController');

router.post('/', mapController.createMap);
router.get('/', mapController.getMaps);
router.get('/getLast', mapController.getLastMap);



module.exports = router;