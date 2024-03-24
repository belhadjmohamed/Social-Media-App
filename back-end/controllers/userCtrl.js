const Users = require('../models/userModel');
const fs = require('fs');

const userCtrl = {
    searchUser : async(req,res) => {
        try {
            const users = await Users.find({username : {$regex : req.query.username}}).limit(10)
            .select("fullname username avatar")

            res.json({users})

        }catch(err){
            res.status(500).json({msg : err.message})
        }
    },

    getUser : async(req,res) => {
        try {
            const user = await Users.findOne({_id : req.params.id}).select("-password").populate("friends following")
            if (!user) return res.status(500).json({msg : "no user exists"})
            res.json({user})


        }catch(err){
            res.status(500).json({msg : err.message})
        }
    },

    getusers : async(req,res) => {
        try {
            const users = await Users.find().limit(10)
         
            res.json({users})


        }catch(err){
            res.status(500).json({msg : err.message})
        }
    },

    updateUser : async(req,res) => {
        try{
            const {website,fullname,story,phone,address,avatar} = req.body;
            if (!fullname) return res.status(500).json({msg : "fullname is required"})
            await Users.findOneAndUpdate({_id : req.user._id},{
                website,fullname,story,phone,address,avatar
            })

            res.json({msg : 'update success'})
    
        }catch (err){
            res.status(500).json({msg : err.message})
        }
    },

    friends : async(req,res) => {
        try{
            const user = await Users.find({_id : req.params.id, friends : req.user._id}).populate("friends");
            if (user.length > 0)  res.status(400).json({msg : 'you have already followed'});

            const updateuserauth = await Users.findOneAndUpdate({_id : req.user._id},{
                $push : {following : req.params.id}
            },{ new : true}).populate("following friends","-password");

            const updateuser = await Users.findOneAndUpdate({_id: req.params.id},{ 
                $push : {friends : req.user._id}
            }, {new : true}).populate("friends following", "-password");


            return  res.status(200).json({
                msg : 'friend added',
                updateuser,
                updateuserauth
            })
    
        }catch (err){
            res.status(500).json({msg : err.message})
        }
    },

    unfriends : async(req,res) => {
        try{
  

            const newUser = await Users.findOneAndUpdate({_id: req.params.id},{ 
                $pull : {friends : req.user._id}
            }, {new : true}).populate("friends following", "-password")

            await Users.findOneAndUpdate({_id: req.user.id},{ 
                $pull : {following : req.params.id}
            }, {new : true})

            res.json({msg : 'friend removed',
            newUser
            
            })
    
        }catch (err){
            res.status(500).json({msg : err.message})
        }
    },

    updateUserimage : async(req,res) => {
        try {
            let newPath =  null;
            if (req.file) {
                const {originalname,path} = req.file;
                const parts = originalname.split('.');
                const ext = parts[parts.length - 1];
                newPath =  path+'.'+ext;
                fs.renameSync(path,newPath);
            }      
            

            const users = await Users.find();
            

            await users.map( async(user) => ( await user.updateOne({
                avatar : newPath ? newPath : user.avatar 
            })));
            
            console.log(newPath)

            res.json(users);
        }catch (error){
            res.status(500).json({msg : error.message})
        }
    },

    saveLocation : async(req,res) => {
        try {
            const {features} = req.body;
            console.log(features);
            const user = await Users.findOneAndUpdate({_id : req.user._id}, { features: features }, {new: true});
            res.json(user);
        
        } catch (error) {
            res.status(500).json({msg : error.message})
        }
    },

    getLocation : async(req,res) => {
        try {
            const user = await Users.findOne({_id : req.user._id});
            res.json(user);
        
        } catch (error) {
            res.status(500).json({msg : error.message})
        }
    }

}

module.exports = userCtrl;