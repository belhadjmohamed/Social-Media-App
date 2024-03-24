const Comments = require('../models/commentModel');
const Posts = require('../models/postModel');

const commentCtrl = {
    createComment : async(req,res) => {
        try {
            const {content, postId, tag, reply, postUserId} = req.body;

            const post1 = await Posts.findById(postId);

            if(!post1) return res.status(400).json({msg:"no post found"});


            const newComment = await new Comments({
                user : req.user._id , content, tag, reply, postUserId, postId
            })

            


            const post = await Posts.findOneAndUpdate({_id : postId},{
                $push : {commentss : newComment._id}
            })
            
            await newComment.save()

            return res.status(200).json({newComment})

        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },
    updateComment : async(req,res) => {
        try {
            const {content} = req.body;

            await Comments.findOneAndUpdate({_id : req.params.id, user: req.user._id},{content})

            




            return res.status(200).json({msg : 'update successfully'})

        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },

    likecomment : async (req,res) => {
        try {
            const comment = await Comments.find({_id : req.params.id, likes : req.user._id})
            if(comment.length>0) return res.status(400).json({msg : 'you have already like this comment'})
    
            await Comments.findOneAndUpdate({_id : req.params.id} , {
                $push : {likes : req.user._id}
            }, {new:true})
    
            return res.json({
                msg : 'Comment liked'
            })            
        } catch (error) {
            return res.json(500).json({msg : error.message})
        }

    },

    unlikecomment : async (req,res) => {
        try {
    
            await Comments.findOneAndUpdate({_id : req.params.id} , {
                $pull : {likes : req.user._id}
            }, {new:true})
    
            return res.json({
                msg : 'Comment unliked'
            })            
        } catch (error) {
            return res.json(500).json({msg : error.message})
        }

    },

    deleteComment : async (req,res) => {
        try {
    
            const comment = await Comments.findOneAndDelete({
                _id : req.params.id,
                $or : [
                    {postUserId : req.user._id},
                    {user : req.user._id}
                ]
            })
            

            const post = await Posts.findOneAndUpdate({_id : comment.postId},{
                $pull : {commentss : req.params.id}
            })

            return res.json({
                msg : 'Comment deleted'
            })   

        } catch (error) {
            return res.json(500).json({msg : error.message})
        }

    },
}


module.exports = commentCtrl;