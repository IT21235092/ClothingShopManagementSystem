const express = require('express');
const Posts = require('../../models/pamudu/posts');
const collection = require('../../models/pamudu/userSchema');
const Dash = require('../../models/pamudu/dashSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({extended: true}))
router.use(cors())

const JWT_SECRET = "hdhjsahdahdjhaj123()aauauaayayka13414959487laksfjafkaf"



//save posts

router.post('/post/save',(req,res)=>{

    let newPost = new Posts(req.body);

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

router.get('/posts',(req,res) =>{
    Posts.find().exec((err,posts) =>{
        if(err){
            return res.status(400).json({
                error:err
            });


        }

        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    });
});

//get a specific post

router.get("/post/:id",(req,res) =>{

    let postId = req.params.id;

    Posts.findById(postId,(err,post) =>{

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

router.put('/post/update/:id',(req,res)=>{

    
    
    Posts.findByIdAndUpdate(req.params.id,
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

router.delete('/post/delete/:id', (req,res)=>{

    Posts.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{

        if(err) return res.status(400).json({

            message:"Delete unsuccessful", err
        });

        return res.json({
            messege:"Delete Successful",deletedPost
        });
    });
});

//Login
router.post("/",async(req,res) =>{
    const{email,password}=req.body;

    const user = await collection.findOne({email});

    if(!user){
        return res.send({error: "User not exist"});
    }

    if(await bcrypt.compare(password,user.password)){

        const token=jwt.sign({email: user.email},JWT_SECRET, {
            expiresIn: "1h",
        });

        if(res.status(201)){
            return res.json({status: "ok", data: token});
            
        }else{

            return res.json({error: "error"})
        }
    }

    res.json({status: "error",error:"Invalid Password"});
    
});

 //registration
 router.post("/register", async (req, res) => {
    const { email, password, user, userType,telephone,address,firstname,lastname } = req.body;
  
    const encryptedPassword = await bcrypt.hash(password,10);
    try {
        const oldUser = await collection.findOne({email});

        if(oldUser){
            return res.send({error: "User exist"})
        }
      await collection.create({ email, user, password:encryptedPassword ,userType ,telephone,address,firstname,lastname});
      res.send({ status: "ok" });
    } catch (e) {
      res.send({ status: "error" });
    }
  });

  //Profile Details
  router.post("/userData",async(req,res)=>{

    const {token} =req.body;
    try{

        const user =jwt.verify(token,JWT_SECRET,(err,res)=>{
            if(err){
                return "token expired"
            }
            return res;
        });
        console.log(user);
        if(user =="token expired"){

            return res.send({status: "error", data: "token expired"});
        }
        const useremail = user.email;
        collection.findOne({email:useremail})
        .then((data)=>{
            res.send({status: "ok", data: data});
        }).catch((error)=>{
            res.send({status: "error", data: error});
        });

    } catch(error){

    }
  })

// Emp Details
router.get('/accounts',(req,res) =>{
    collection.find().exec((err,userSchema) =>{
        if(err){
            return res.status(400).json({
                error:err
            });


        }

        return res.status(200).json({
            success:true,
            userDetails:userSchema
        });
    });
});

//save posts

router.post('/emp/save',(req,res)=>{

    let newPost = new Dash(req.body);

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

router.get('/emp',(req,res) =>{
    Dash.find().exec((err,dashSchema) =>{
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

router.get("/emp/:id",(req,res) =>{

    let empId = req.params.id;

    Dash.findById(empId,(err,post) =>{

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

router.put('/emp/update/:id',(req,res)=>{

    
    
    Dash.findByIdAndUpdate(req.params.id,
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

router.delete('/emp/delete/:id', (req,res)=>{

    Dash.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{

        if(err) return res.status(400).json({

            message:"Delete unsuccessful", err
        });

        return res.json({
            messege:"Delete Successful",deletedPost
        });
    });
});



module.exports = router;