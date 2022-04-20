const { Router } = require('express');

const Flat = require('../models/flat.model');

const router = Router();

// sorting 
// http://localhost:7000/flats?q=sort&sort=-1
// http://localhost:7000/flats?q=filter&base=owner
// http://localhost:7000/flats?q=search&block=B

router.post('/flat', async(req, res) => {
     try{
         const flat = await Flat.create(req.body)
         return res.status(200).send(flat)
     } catch (error) {
         return res.status(500).send({
             message : error.message
         })
     }
})

router.get('/flat/:id', async(req, res) => {
    try {
        const flat = await Flat.findById(req.params.id).lean().exec();
        return res.status(200).send(flat)
    } catch (error) {
        return res.status(500).send({
            message : error.message
        })
    }
})

router.get('/flats', async (req, res) => {
    try{ 

         //console.log("check")
        const page = req.query.page || 1
        const limit = req.query.limit || 8
        let flats = await Flat.find().skip((page - 1)  *limit).limit(limit).lean().exec()


        const totalDocs = await Flat.find().countDocuments()   // flat.length || 0

        const totalPages = (Math.ceil(totalDocs / limit))

        let arr = [];

         //console.log({flats})
         for(let i = 1; i<= totalPages; i++) {

            arr.push(i);
         }

            if(req.query.q) {
                if(req.query.q == 'sort') {
                    flats = req.query.sort == 1 ? flats.sort((a, b) => (a.no - b.no)) : flats.sort((a, b) => (b.no - a.no))
                }
                 
                else if(req.query.q == 'filter') {
                    flats = flats.filter(flat => flat.type == req.query.base)
                }
                else if( req.query.q == 'search'){
                    flats = flats.filter(flat => flat.block == req.query.block)
                }
            }
            // console.log({flats})
            return res.status(200).send({
                flats, totalPages : arr
            })
         
    } catch (error ) {
        return res.status(500).send({message : error.message})
    }
})

module.exports = router