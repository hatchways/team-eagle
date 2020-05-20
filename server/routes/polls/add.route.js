const express = require("express");
const router = express.Router();
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3")
const Poll = require("../../models/polls");

const s3 = new aws.S3({
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,    
});

const upload = multer({    
    storage: multerS3({        
        s3: s3,
        bucket: "hatchways-social-app",
        metadata: (req, file, cb) => {
            cb(null, {fieldName: file.fieldname})
        },
        key: function(req, file, cb){            
            cb(null, Date.now().toString() + '-' + file.originalname)
        }
    })
});

router.post("/", upload.any(), (req, res)=>{        
    const errors = []        
    if (!req.body.title) errors.push({title:"Invalid title"});        
    if (!req.body.userId) errors.push({userId:"Invalid user id"});            
    if (req.files.length < 2) errors.push({images:"minimum two images required"});

    if (errors.length > 0) return res.status(400).json({"error":errors});
    
    const poll = new Poll({
        title: req.body.title,
        userId: req.body.userId,                
    })        
    // Trying to save the poll
    try{
        poll.save();        
    }    
    catch(error){
        return res.status(400).json({error:error.message})
    }
    // Saving file location to the poll object
    try{
        req.files.map((item)=>{
            console.log(item)
            poll.addImage(item.location);
        })  
    }      
    catch(error){
        return res.status(400).json({error:error.message})
    }
    return res.status(200).json({poll:poll});
})

module.exports = router;