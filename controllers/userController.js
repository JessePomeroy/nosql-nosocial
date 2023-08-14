const { User } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err))
    },

    getSingleUser(req, res) {
        User.findById(req.params.userId)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(req.params.id, req.body, { new: true })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'no user found' });
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete(req.params.id)
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'no user found' });
                }
                res.json({ message: 'user deleted' });
            })
            .catch(err => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId || req.params.friendId } },
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
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'no user found' });
                }

                const deleted = !userData.friends.includes(params.friendId);

                if (deleted) {
                    res.json({ message: 'user deleted from friends list', userData });
                } else {
                    res.json(userData);
                }
            })
            .catch(err => res.status(500).json(err));
    }
}

module.exports = userController