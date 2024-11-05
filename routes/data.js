const express=require('express')
const router=express.Router()

const dataController=require('../controllers/home')

router
    .route('/')
    .get(dataController.getAllData)
    .post(dataController.addData)
router
    .route('/:id')
    .get(dataController.getDataById)
    .patch(dataController.dataUpdate)
    .delete(dataController.deleteData)


module.exports=router