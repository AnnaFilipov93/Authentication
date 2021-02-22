const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {

   // res.redirect('https://http://localhost:3000/');
    res.send('server is up');
});

module.exports = router;