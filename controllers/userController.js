const { User, Thought } = require('../models');

module.exports = {

    getAllUsers(req, res) {
        User.find()
            .then((response) => res.json(response))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    createNewUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: "No user found with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: "No user found with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: "No user found with this ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }, 

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friendsId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: "No user found with this ID"})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};