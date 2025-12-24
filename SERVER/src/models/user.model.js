const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    clerkId : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    firstName : {
        type : String,
        trim : true
    },
    lastName :{
        type : String,
        trim : true
    },
    imageUrl : {
        type : String,
    },
    role : {
        type : String,
        enum : ["user", "modarator", "ädmin"],
        default: "user",
    },
    },
    { timestamps: true }
);

const User = model("User", userSchema)

module.exports = User