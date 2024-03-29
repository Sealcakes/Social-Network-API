const { Schema, model } = require('mongoose');

const validateEmail = function (email) {
    const validator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validator.test(email);
};

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, "Please use a valid email address"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please use a valid email address",
            ],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },

    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;