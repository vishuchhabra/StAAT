const Student  = require('../models/student')



// update the activity
exports.updateActivity =async (req,res)=>{
 
    const  {name, class_name , roll_no,password} = req.body

    
    // Base condition
    if(!name || !class_name || !roll_no || !password){
        return res.status(400).json({
            error:"Provide Complete Data"
        })       
    }

    // checking condition
    const local_password="1016594680";

    if(local_password!=password){
        return res.status(400).json({
            error:"Access Denied"
        })
    }

    // updating the record
    Student.updateOne({$and:[{class_name:class_name },{roll_no:roll_no}]},
    { $inc: {activity:1 } },(err,data)=>{
        if(err){
            return res.status(400).json({
                error:"Problem with Updating"
            })
        }
        return res.status(200).json({
            msg:"Updated SuccessFully"
        })
    })
}



// update the attendance
exports.updateAttend= async (req,res,next)=>{
    
    const  { class_name , roll_no,password} = req.body

    // Base condition
    if( !class_name || !roll_no || !password){
        return res.status(400).json({
            error:"Provide Complete Data"
        })       
    }

    // checking condition
    const local_password="1016594680";

    if(local_password!=password){
        return res.status(400).json({
            error:"Access Denied"
        })
    }

    try{
        const data = await Student.findOne({$and:[{class_name:class_name },{roll_no:roll_no}]});

        // check the data if insertable or not 
        const Attedance = await data.attendance
    
        // Getting the Date
        var today = new Date();
        var dd =await String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + mm + yyyy
        
        var returning_val = false
        await Attedance.forEach(val =>{
            if(val===today){
                returning_val = true;
            }
        })
        if(returning_val){
            return res.status(400).json({
                error:"Already Updated"
            })       
        }

        // updating the record
        Student.updateOne({$and:[{class_name:class_name },{roll_no:roll_no}]},
            { $push: {attendance:today } },(err,data)=>{
                if(err){
                    return res.status(400).json({
                        error:"Problem with Updating"
                    })
                }
                return res.status(200).json({
                    msg:"Updated SuccessFully"
                })
        }) 

    }
    catch(err){
        return res.status(400).json({
            error:"Problem with Updating"
        })  
    }  

}


// delete the student

exports.deleteStudent = (req,res)=>{

    // extracting condition
    const  {password, roll_no} = req.body

    // Base condition
    if(!roll_no || !password){
        return res.status(400).json({
            error:"Provide Complete Data"
        })       
    }

    // checking condition
    const local_password="1016594680";

    if(local_password!=password){
        return res.status(400).json({
            error:"Access Denied"
        })
    }

    // deleting the database
    Student.deleteOne({roll_no}).then(data=>{
        return res.status(200).json({
            msg:"Deleting SuccessFully...."
        })    
    })
    .catch(error=>{
        return res.status(400).json({
            error:"Problem with Deleting"
        })       
    })

}
