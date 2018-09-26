const express = require('express')
const router = express.Router()

router.get('/test',(req,res) => {
    res.json({msg:'login works'})
})

router.post('/register',(req,res) => {
    console.log(req.body)
})




module.exports = router