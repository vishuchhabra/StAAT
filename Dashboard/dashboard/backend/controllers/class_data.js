const ClassData  = require('../models/class_data')


// creating the class
exports.createClass = (req,res)=>{
    
    const class_data = new ClassData(req.body)

    class_data.save((err,class_record) => {
        if (err) {
          console.log(err)
          return res.status(400).json({
            error: "Problem With Storing in Database"
          });
        }
        res.json(class_record);
      })
}

// update the activity
exports.updateActivity= (req,res)=>{
    
    const {class_name,count,password} = req.body

    // Base condition
    if(!class_name || !count || !password){
        return res.status(400).json({
            error:"Please Provide Complete Data"
        })
    }

    // Password
    if(password!= "1016594680"){
        return res.status(400).json({
            error:"Authentication Failed"
        })
    }

    // updating the record
    ClassData.updateOne({name:class_name},{$inc:{count:count}},(err,data)=>{
        if(err){
            return res.status(400).json({
                error:"Unable to Store in DB"
            })
        }

        return  res.status(200).json({
            msg:"Updated SuccessFully"
        })
    })
}






