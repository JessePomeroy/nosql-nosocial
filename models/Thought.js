const { Schema, model } = require('mongoose');
const reactionSchema = require('./React');

const thoughtSchema = new Schema(
    {
        thoughtBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
        // embed reactions
    },
    {
        toJSON:
        {
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// virtual to get reaction length

const Thought = model('Thought', thoughtSchema);
// create thought model

module.exports = Thought