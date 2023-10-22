const {User, Thought} = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({_id: req.params.userId})
        .populate("friends")
        .populate("thoughts");

      if (!user) {
        return res.status(404).json({message: "No user with that ID"});
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const dbUserData = await User.create({
        username: req.body.username,
        email: req.body.email
      });
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: req.body},
        {runValidators: true, new: true}
      )
        .populate("friends")
        .populate("thoughts");

      if (!user) {
         return res.status(404).json(err)
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      await Thought.deleteMany({username: user.username});
      const deletedUser = await User.findOneAndDelete({_id: req.params.userId});

      if (!deletedUser) {
        return res.status(404).json(err)
      }

      res.status(200).json(deletedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$push: {friends: req.params.friendId}},
        {new: true}
      )
        .populate("friends")
        .populate("thoughts");

      if (!user) {
          return res.status(404).json(err);
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: {friends: req.params.friendId}},
        {new: true}
      )
        .populate("friends")
        .populate("thoughts");

      if (!user) {
        return res.status(404).json(err);
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err)
    }
  }
};
