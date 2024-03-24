const Notifies = require('../models/notifyModel');



const notifyCtrl = {
    createnotify : async (req,res) => {
        try {

            const {id, recipients, url,content,image,text} = req.body;

            if(recipients.includes(req.user._id.toString())) return;
    
            const notify = await new Notifies({
                id, recipients, url,content,image,text, user : req.user._id
            })

            await notify.save()

            return res.json({
                notify
            })
        } catch (error) {
            return res.status(400).json({msg : error.message})
        }
    },
    removenotify : async (req,res) => {
        try {
            const notify = await Notifies.findOneAndDelete({id : req.params.id, url : req.query.url})


            return res.json({
                notify
            })
        } catch (error) {
            return res.status(400).json({msg : error.message})
        }
    },
    getnotify : async (req,res) => {
        try {
            const notifies = await Notifies.find({recipients : req.user._id}).sort("createdAt").populate("user", "avatar fullname username")


            return res.json({
                notifies
            })
        } catch (error) {
            return res.status(400).json({msg : error.message})
        }
    },
    isReadNotify : async (req,res) => {
        try {
            const notifies = await Notifies.findOneAndUpdate({_id : req.params.id}, {isRead : true})
            return res.json({
                notifies
            })
        } catch (error) {
            return res.status(400).json({msg : error.message})
        }
    },
    DeleteAllnotifications : async (req,res) => {
        try {
            const notifies = await Notifies.deleteMany({recipients : req.user._id})
            return res.json({
                notifies
            })
        } catch (error) {
            return res.status(400).json({msg : error.message})
        }
    }

}


module.exports = notifyCtrl;