const Posts = require('../models/postModel');
const Users = require('../models/userModel');
const Comments = require('../models/commentModel');

const postCtrl = {
    createPost : async (req,res) => {
        try {
            const {Content , images,gsonFeatures} = req.body;
            
            const newPost = await new Posts ({
                user : req.user._id ,content : Content , images , features : gsonFeatures
            }).populate('user');

            await newPost.save();

            return res.status(200).json({
                msg : 'Post saved',
                newPost
            });

        }catch (error){
            return res.json(500).json({msg : error.message})
        }
    },

    getPost : async (req,res) => {
        try {
            console.log(req.user)
            const posts = await Posts.find({user : [...req.user.following, req.user._id]}).sort("-createdAt")
            .populate("user likes","username avatar fullname friends")
            .populate({
                path : "commentss",
                populate : {
                    path : "user likes",
                    select : "-password"
                }
            })
            
            if (!posts) return res.status(500).json({msg : 'No post found'}) 
            return res.status(200).json({
                msg : 'post found',
                result : posts.length,
                posts   
            })

        }catch (error){
            return res.json(500).json({msg : error.message})
        }
    },
    
    updatePost : async (req,res) => {
        try {
            const {Content , images,gsonFeatures} = req.body;
            
            const post = await Posts.findOneAndUpdate({_id : req.params.id}, {
                content : Content , images, features : gsonFeatures
            },{new:true}).populate('user likes', 'username avatar fullname')


            return res.status(200).json({
                msg : 'Post updated',
                post
            });

        }catch (error){
            return res.json(500).json({msg : error.message})
        }
    },

    likepost : async (req,res) => {
        try {
            const post = await Posts.find({_id : req.params.id, likes : req.user._id})
            if(post.length>0) return res.status(400).json({msg : 'you have already like this post'})
    
            const like = await Posts.findOneAndUpdate({_id : req.params.id} , {
                $push : {likes : req.user._id}
            }, {new:true})
    
            if(!like) return res.status(400).json({msg:"no post found"});

            return res.json({
                msg : 'Post liked'
            })            
        } catch (error) {
            return res.json(500).json({msg : error.message})
        }

    },

    savePost : async (req,res) => {
        try {
            const user = await Users.find({_id : req.user._id, saved : req.params.id})
            if(user.length>0) return res.status(400).json({msg : 'you have already save this post'})
    
            await Users.findOneAndUpdate({_id : req.user._id} , {
                $push : {saved : req.params.id}
            }, {new:true})
    
            return res.json({
                msg : 'Post saved'
            })            
        } catch (error) {
            return res.json(500).json({msg : error.message})
        }

    },

    unsavePost : async (req,res) => {
        try {

            await Users.findOneAndUpdate({_id : req.user._id} , {
                $pull : {saved : req.params.id}
            }, {new:true})
    
            return res.json({
                msg : 'Post unsaved'
            })            
        } catch (error) {
            return res.json(500).json({msg : error.message})
        }

    },

    unlikepost : async (req,res) => {
        try {
    
            const unlike = await Posts.findOneAndUpdate({_id : req.params.id} , {
                $pull : {likes : req.user._id}
            }, {new:true})
    
            if (!unlike) return res.status(400).json({msg:"no post found"});

            return res.json({
                msg : 'Post unliked'
            })            
        } catch (error) {
            return res.json(500).json({msg : error.message})
        }

    },

    getUserPosts : async (req,res) => {
        try {
            console.log(req.user)
            const posts = await Posts.find({user : req.params.id}).sort("-createdAt")
            .populate("user likes","username avatar fullname")
            .populate({
                path : "commentss",
                populate : {
                    path : "user likes",
                    select : "-password"
                }
            })
            
            if (!posts) return res.status(500).json({msg : 'No post found'}) 
            return res.status(200).json({
                msg : 'post found',
                result : posts.length,
                posts   
            })

        }catch (error){
            return res.json(500).json({msg : error.message})
        }
    },
    getOnePost : async (req,res) => {
        try {
            console.log(req.user)
            const post = await Posts.findById(req.params.id)
            .populate("user likes","username avatar fullname friends")
            .populate({
                path : "commentss",
                populate : {
                    path : "user likes",
                    select : "-password"
                }
            })
            
            if (!post) return res.status(500).json({msg : 'No post found'}) 
            return res.status(200).json({
                post
            })

        }catch (error){
            return res.json(500).json({msg : error.message})
        }
    },

    getsavePost : async (req,res) => {
        try {

            const user = await Users.findById(req.params.id)

            const savedposts = await Posts.find({_id : {$in: user.saved}}).sort("-createdAt")
            .populate("user likes","username avatar fullname").populate("commentss")
            return res.json({
                savedposts
            })
            
            

        }catch (error){
            return res.json(500).json({msg : error.message})
        }
    },
    DeletePost : async (req,res) => {
        try {
            const post = await Posts.findOneAndDelete({_id : req.params.id, user : req.user._id})
            await Comments.deleteMany({_id : {$in : post.commentss}})
            
            res.json({
                msg : 'Post deleted',
                newPost : {
                    ...post,
                    user : req.user
                }
            })
            

        }catch (error){
            return res.json(500).json({msg : error.message})
        }
    },

    // saveLocationPost : async(req,res) => {
    //     try {
    //         const {features} = req.body;
    //         console.log(features);
    //         const user = await Users.findOneAndUpdate({_id : req.user._id}, { features: features }, {new: true});
    //         res.json(user);
        
    //     } catch (error) {
    //         res.status(500).json({msg : error.message})
    //     }
    // },

    // getLocationPost : async(req,res) => {
    //     try {
    //         const user = await Users.findOne({_id : req.user._id});
    //         res.json(user);
        
    //     } catch (error) {
    //         res.status(500).json({msg : error.message})
    //     }
    // }

}

module.exports = postCtrl;