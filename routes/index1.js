var express = require('express');
var router = express.Router();
var ticketsArr = require('../reduceJson');
const {MongoClient} = require('mongodb');

let tickets = null


const mongoConnect = async () => {
    const uri = "mongodb+srv://danila:danila@cluster0.q74b3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    await client.connect(async err => {
        console.log('trying')
        tickets = client.db("air").collection("tickets");
        console.log('goood connection')
    });


    // tickets.insertMany(myobj,async () => {
    //     await ticket.json()
    // });

}

const createEndpoints = async () => {
    /* GET home page. */
    router.get("/", async (req, res) => {
        const response = await tickets.find().toArray()
            .catch(err => console.error(`Failed to find documents: ${err}`))
        res.json(response);
    })

    router.get("/all", async (req, res) => {

        const response = await tickets.find().limit(+req.query.limit).toArray()
            .catch(err => console.error(`Failed to find documents: ${err}`))
        res.json(response);
    })

    router.get("/filter", async (req, res) => {
            let response = null

            console.log(req.query)

            // if (req.query.forwardAirline && req.query.sortDuration === 'true') {
            response = await tickets
                .find(
                    req.query.backAirline ? {$and: [{"backTicket.airline": req.query.backAirline}, {price: {$gte: req.query.minPrice}}]}
                        :
                        req.query.forwardAirline ? {$and: [{"forwardTicket.airline": req.query.forwardAirline}, {price: {$gte: req.query.minPrice}}]}
                            :
                            (req.query.minPrice || req.query.maxPrice) ? {$and: [{price: {$gte: +req.query.minPrice || 0}}, {price: {$lte: +req.query.maxPrice || 10000000}}]}
                                : {}
                )
                .limit(req.query.limit ? +req.query.limit : 0)
                .sort(
                    req.query.sortForwardDuration === 'true' && {"forwardTicket.totalDuration": 1}
                    ||
                    req.query.sortForwardDuration === 'false' && {"backTicket.totalDuration": -1}
                    ||
                    req.query.sortBackDuration === 'true' && {"backTicket.totalDuration": 1}
                    ||
                    req.query.sortBackDuration === 'false' && {"backTicket.totalDuration": -1}
                    ||
                    {}
                )
                .toArray()
            // } else if (req.query.forwardAirline) {
            //     response = await tickets.find(req.query.forwardAirline && {"forwardTicket.airline": req.query.forwardAirline})
            //         .limit(req.query.limit ? +req.query.limit : 0)
            //         .sort({"forwardTicket.totalDuration": 1})
            //         .toArray()
            // }


            //     if (req.query.totalduration === 'forward-increase') {
            //         response = await tickets.find().sort({"forwardTicket.totalDuration": 1}).toArray()
            //             .catch(err => console.error(`Failed to find documents: ${err}`))
            //     } else if (req.query.totalduration === 'forward-decrease') {
            //         response = await tickets.find().sort({"forwardTicket.totalDuration": -1}).toArray()
            //             .catch(err => console.error(`Failed to find documents: ${err}`))
            //     }
            //
            //
            //     if (req.query.totalduration === 'back-increase') {
            //         response = await tickets.find().sort({"backTicket.totalDuration": 1}).toArray()
            //             .catch(err => console.error(`Failed to find documents: ${err}`))
            //     } else if (req.query.totalduration === 'back-decrease') {
            //         response = await tickets.find().sort({"backTicket.totalDuration": -1}).toArray()
            //             .catch(err => console.error(`Failed to find documents: ${err}`))
            //     }
            //
            //     console.log(req.query)
            //
            //     if (req.query.forwardAirline) {
            //         response = await tickets.find({"forwardTicket.airline": req.query.forwardAirline}).toArray()
            //             .catch(err => console.error(`Failed to find documents: ${err}`))
            //     } else if (req.query.backAirline) {
            //         response = await tickets.find({"backTicket.airline": req.query.backAirline}).toArray()
            //             .catch(err => console.error(`Failed to find documents: ${err}`))
            //     }
            //
            //
            //     if (req.query.limit) {
            //         let newArr = []
            //         response.forEach((item, index) => {
            //             if (index < req.query.limit) {
            //                 newArr.push(item)
            //             }
            //         })
            //         response = [...newArr]
            //     }
            res.json(response);
        }
    )
//
}

const launch = async () => {
    await mongoConnect()


    // setTimeout(() => {
    //      ticketsArr.forEach((elem) => {
    //         console.log(elem.price)
    //          tickets.insertOne(elem)
    //          // tickets.update({price: elem}, {$set: {price: +elem}}, false, true);
    //      })
    // }, 2000)


    await createEndpoints()
}

launch()


module.exports = router;
