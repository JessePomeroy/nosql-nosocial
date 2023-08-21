const { User } = require('../models');
// require the User model 

const userController = {
    // initialize a user controller object to hold methods
    getUsers(req, res) {
        // get all users from the database
        User.find({})
            .then(userData => res.json(userData))
            // return all users on success
            .catch(err => res.status(500).json(err))
    },

    getSingleUser(req, res) {
        // get a single user from the database
        User.findById(req.params.userId)
            .then(userData => res.json(userData))
            // return a single user on success
            .catch(err => res.status(500).json(err));
    },

    createUser(req, res) {
        // create a new user
        User.create(req.body)
            .then(userData => res.json(userData))
            // return new user on success
            .catch(err => res.status(500).json(err));
    },

    updateUser(req, res) {
        // update a user's info
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'no user found' });
                }
                res.json(userData);
                // return updated user on success
            })
            .catch(err => res.status(500).json(err));
    },

    deleteUser(req, res) {
        // delete selected user based on id
        User.findOneAndDelete({ _id: req.params.userId })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'no user found' });
                }
                res.json({ message: 'user deleted' });
                // return deleted user message
            })
            .catch(err => res.status(500).json(err));
    },

    addFriend(req, res) {
        // add a friend to a user's friend array
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId || req.params.friendId } },
            // use $addToSet to add to friends array without duplicates
            { new: true }
        )
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'no user found' });
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
    },

    removeFriend({ params }, res) {
        // remove a friend from a user's friend array
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            // use $pull to remove friend from friend array
            { new: true }
        )
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'no user found' });
                }

                const deleted = !userData.friends.includes(params.friendId);
                // check if friend was deleted

                if (deleted) {
                    res.json({ message: 'user deleted from friends list', userData });
                    // return success message if deleted
                } else {
                    res.json(userData);
                }
            })
            .catch(err => res.status(500).json(err));
    }
}

module.exports = userController