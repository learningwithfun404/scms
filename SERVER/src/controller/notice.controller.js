const Notice = require("../models/notice.model")

const noticeCreateHandler = async (req, res) => {
    try {
       const notice = await Notice.create(req.body) 
        res.status(201).json({
            statusCode : 201,
            message : "Notice created successfully",
            data : notice,
        });
    } catch (error) {
         res.status(500).json({
            statusCode : 500,
            message : "Internal server error",
            error : error,
        });
    }
};

const noticeFindHandler = async (req,res) => {
    try {
        const allNotice = await Notice.find()
        if(!allNotice || allNotice.length === 0){
             res.status(404).json({
            statusCode : 404,
            message : "Notice not found",
            error : error,
        })
        }

         res.status(200).json({
            statusCode : 200,
            message : "Notice return successfully",
            data : allNotice,
        })
    } catch (error) {
         res.status(500).json({
            statusCode : 500,
            message : "Internal server error",
            error : error,
        })
    }
}

const singleNoticeFindHandler = async (req,res) => {
    try {
        const {id} = req.params
        const notice = await Notice.findById(id);
        if(!notice){
             res.status(404).json({
            statusCode : 404,
            message : "Notice not found",
            error : error,
        })
        }
         res.status(200).json({
            statusCode : 200,
            message : "Notice return successfully",
            data: notice,
        })
    } catch (error) {
       res.status(500).json({
            statusCode : 500,
            message : "Internal server error",
            error : error,
        })  
    }
}

const deleteNoticeFindHandler = async (req,res) => {
    try {
        const {id} = req.params;
        await Notice.findByIdAndDelete(id)
         res.status(200).json({
            statusCode : 200,
            message : "Notice Deleted Successfully",
        })
    } catch (error) {
         res.status(500).json({
            statusCode : 500,
            message : "Internal server error",
            error : error,
        })
    }
}
const updateNoticeFindHandler = async (req,res) => {
 try {
       const {id} = req.params;
    const updateNotice = await Notice.findByIdAndUpdate(id,req.body,{
        new:true,
    });
     res.status(200).json({
            statusCode : 200,
            message : "Notice updated successfully",
            data : updateNotice,
        })
 } catch (error) {
     res.status(500).json({
            statusCode : 500,
            message : "Internal server error",
            error : error,
        })
 }
}
module.exports = {
    noticeCreateHandler,
    noticeFindHandler,
    singleNoticeFindHandler,
    deleteNoticeFindHandler,
    updateNoticeFindHandler
}