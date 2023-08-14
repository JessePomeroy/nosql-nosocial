const router = require('express').Router();

const api = require('./api')

router.use('/api', api);
router.use((req, res) => {
    return res.status(404).send('Error! Not Found!!!');
});

module.exports = router;