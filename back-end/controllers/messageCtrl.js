const conversationModel = require('../models/conversationModel');
const conversations = require('../models/conversationModel');

const Messages = require('../models/messageModel');

const messageCtrl = {
    createMessage : async (req,res) => {
        try {
            const {recipient,  text , media} = req.body;
            if (!recipient || (!text.trim() && media.length === 0 )) return;

            const newConvesation = await conversations.findOneAndUpdate({
                $or : [
                    {recipients: [req.user._id, recipient]},
                    {recipients : [recipient,req.user._id]}
                ]
            },{
                recipients : [req.user._id, recipient],
                text , media
            },{
                new : true ,upsert: true
            })

            const newMessage = new Messages({

                conversation : newConvesation._id,
                sender : req.user._id,
                recipient ,text,media
            })

            await newMessage.save()

            res.json({newConvesation})

        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },
    getConversation : async (req,res) => {
        try {
            const conversation = await conversations.find({
                recipients : req.user._id
            }).sort('updatedAt').populate('recipients',"avatar fullname username")

            res.json({
                conversation,
                result : conversation.length
            })
            

        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },

    getMessages : async (req,res) => {
        try {
            const messages = await Messages.find({
                $or : [
                    {sender : req.user._id, recipient : req.params.id},
                    {sender : req.params.id , recipient : req.user._id}
                ]
            }).sort('-createdAt').populate('recipient',"avatar fullname username")

            res.json({
                messages,
                result : messages.length
            })
            

        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },
    deleteMessages : async (req,res) => {
        try {
            const message = await Messages.findOneAndDelete({_id : req.params.id , sender : req.user._id})

            res.json({
                msg : 'deleted'
            })
            

        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },
}

module.exports = messageCtrl;