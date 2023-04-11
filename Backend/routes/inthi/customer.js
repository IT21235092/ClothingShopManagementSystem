const express = require('express');
const Cus = require('../../models/inthi/customerSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({extended: true}))
router.use(cors())


//save posts

router.post('/cus/save',(req,res)=>{

    let newPost = new Cus(req.body);

    newPost.save((err) =>{

        if(err){
            return res.status(400).json({
                error:err
            });
        }

        return res.status(200).json({

            success:"Posts saved successfully"
        });
    });


});


//get posts

router.get('/cus',(req,res) =>{
    Cus.find().exec((err,dashSchema) =>{
        if(err){
            return res.status(400).json({
                error:err
            });


        }

        return res.status(200).json({
            success:true,
            existingPosts:dashSchema
        });
    });
});

//get a specific post

router.get("/cus/:id",(req,res) =>{

    let empId = req.params.id;

    Cus.findById(empId,(err,post) =>{

        if(err){
            return res.status(400).json({success:false, err})
        }

        return res.status(200).json({
            success:true,
            post
        });
    });
});

//update routes

router.put('/cus/update/:id',(req,res)=>{

    
    
    Cus.findByIdAndUpdate(req.params.id,
        {
            $set:req.body
        },
        (err,post) =>{

            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Succesfully",
                
            });
        }
    );
});

//delete post

router.delete('/cus/delete/:id', (req,res)=>{

    Cus.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{

        if(err) return res.status(400).json({

            message:"Delete unsuccessful", err
        });

        return res.json({
            messege:"Delete Successful",deletedPost
        });
    });
});



module.exports = router;