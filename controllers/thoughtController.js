const {Thought, User} = require("../models");

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})
                .populate("reactions");

            if (!thought) {
                return res.status(404).json({message: "No thought with that ID"});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$addToSet: {thoughts: thought._id}},
                {new: true},
            )
                .populate("friends")
                .populate("thoughts");

            if (!user) {
                return res.status(404).json(err)
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {new: true}
            )
                .populate("reactions");

            if (!thought) {
                return res.status(404).json(err);
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
            await User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            )
                .populate("friends")
                .populate("thoughts");

            if (!thought) {
                return res.status(404).json(err);
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$push: {reactions: req.body}},
                {runValidators: true, new: true}
            );

            if (!reaction) {
                return res.status(400).json(err);
            }

            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async pullReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {new: true}
            );

            if (!reaction) {
                return res.status(404).json(err);
            }

            res.json(reaction);
        } catch (err) {
            res.status(500).json(err)
        }
    }
};