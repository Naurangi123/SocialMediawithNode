
const Data=require('../models/data')
const mongoose = require('mongoose')


module.exports.getAllData=async(req,res)=>{
    try {
        const users=await Data.find()

        if (!users || users.length === 0) {
            return res.status(404).json({
              msg: "No users found",
              count: users.length,
              users: [] 
            });
          }

        return res.status(200).json({
            msg:"All Users are here",
            results:users.length,
            users:users
        })
    } catch (error) {
        return res.status(500).json(
            {
                msg:"Internal Server Error",
                error:error.message
            }
        )
    }
}

module.exports.getDataById = async (req, res) => {
    try {
        // const id = req.params.id;

        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(400).json({ msg: "Invalid ID format" });
        // }

        // Find the user by ID
        const user = await Data.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({
            msg: "User found",
            user: user
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error",
            error: error.message
        });
    }
};



module.exports.addData=async(req,res)=>{
    try {
        // const {name,email,address,dob,location}=req.body;

        // if(!name ||!email ||!address||!dob||!location){
        //     return res.status(400).json({msg:"All fields are required"})
        // }

        // const data=await Data.create({
        //     name:name,
        //     email:email,
        //     address:address,
        //     dob:dob,
        //     location:location
        // })
        const data=await Data.create(req.body);
        data.save()
        return res.status(200).json({
            msg: "Data add successfully",
            data:  data 
        })
    } catch (error) {
        return res.status(500).json({msg:"There is Something Gone Wrong",error: error.message})
        
    }
}

module.exports.dataUpdate = async (req, res) => {
    // const { name, email, address, dob, location } = req.body;
    try {
        // Update the data
        const updated = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true,runValidators: true });
        
        // Check if the document was found and updated
        if (!updated) {
            return res.status(404).json({
                msg: "Data not found",
            });
        }

        res.status(200).json({
            msg: "Data updated successfully",
            data: updated,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Internal Server Error",
            error: error.message,
        });
    }
};

module.exports.deleteData = async (req, res) => {
    try {

        // const id  = req.params.id;


        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(400).json({ msg: "Invalid ID format" });
        // }


        const data = await Data.findByIdAndDelete(req.params.id);
        // console.log("data",data);
         

        if (!data) {
            return res.status(404).json({ msg: "Data not found" }); 
        }
        return res.status(200).json({ msg: "Data deleted successfully",data: data }); 
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            msg: "Internal Server Error",
            error: error.message 
        });
    }
};
