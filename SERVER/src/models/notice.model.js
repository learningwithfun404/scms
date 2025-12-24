const { Schema, model } = require("mongoose");

const noticeSchema = new Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    desc : {
        type : String,
        required : true,
        trim : true
    }
      
    }, {timestamps : true})

    const Notice = model("Notice", noticeSchema);
    module.exports = Notice;