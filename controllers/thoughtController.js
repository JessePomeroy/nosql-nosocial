const { Thought, User, Reaction } = require('../models');
// import models
const { Types } = require('mongoose');

const thoughtController = {
    async getThoughts(req, res) {
        // get all thoughts
        try {
            const thought = await Thought.findOne().sort({ createdAt: -1 });
            // find latest thought
            res.json(thought);
            // return thought
        } catch (err) {
            res.status(500).json(err);
        };
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            // find thought by id
            if (!thought) {
                res.status(404).json({ message: 'head(id) empty, no thoughts' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });
            res.status(200).json(thought);
        } catch (err) {
            res.status()
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
                new: true,
            });
            if (!thought) {
                res.status(404).json({ message: 'head empty, no thoughts' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                // find thought and update reactions array
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            thought ? res.json(thought) : res.status(404).json({ message: notFound });
            // check if thought exists
        } catch (e) {
            res.status(500).json(e);
        }

    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                // find thought and remove reaction from array
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            thought ? res.json(thought) : res.status(404).json({ message: error });
            // check if thought exists
        } catch (err) {
            res.status(500).json(err);
        }
    },
}

module.exports = thoughtController