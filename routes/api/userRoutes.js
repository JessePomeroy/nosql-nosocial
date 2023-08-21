const router = require('express').Router();
// import express router

const {
    // user controller methods imported from userController
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);
// route to get all and create users

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
// route to get single user, update single user and delete user

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
// route to add or delete friends

module.exports = router;