const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema(
    {
      name : { type : String, require : true },
       no : { type : Number, required : true },
       age : { type : Number, required : true },
    
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

module.exports = mongoose.model("flat", flatSchema);