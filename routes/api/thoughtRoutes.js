const router = require('express').Router();
// import express router
const {
    // thought controller methods imported from thoughtController
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);
// route to get thoughts and create thoughts

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
// route to get single thought, update single thought or delete single thought

router.route('/:thoughtId/reactions').post(addReaction);
// route to add reactions to thoughts

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);
// route to delete reactions from thoughts

module.exports = router;