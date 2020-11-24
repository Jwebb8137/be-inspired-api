const express = require('express')
const userRouter = express.Router()
const bodyParser = express.json()

const videos = [
    {
        title: "video1",
        length: "2 mins",
        format: "mp4"
    },
    {
        title: "video2",
        length: "3 mins",
        format: "mp4"
    },
    {
        title: "video3",
        length: "5 mins",
        format: "mp4"
    }
]

userRouter
    .route('/')
    .get((req,res) => {
        res.json(videos)
    })
    .post(bodyParser, (req,res) => {
        //some code
    })

    .route('/:userId')
    .get((req,res) => {
        const { userId } = req.params;
        res.json(userId);
    })
    .delete((req, res) => {
        //some code
        res
            .status(204)
            .end()
    })

module.exports = userRouter;