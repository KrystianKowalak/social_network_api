const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  pullReaction
} = require("../../controllers/userController.js");

router.route("/")
  .get(getUsers)
  .post(createUser);

router.route("/:userId")
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router.route("/:userId/friends/:friendId")
.post(addFriend)
.delete(removeFriend);

module.exports = router;
