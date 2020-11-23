require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

const videos = [
    "Sport Video: A Sport video",
    "Humor Video: A Humourous Video"
]

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    // move to the next middleware
    next()
})

function getUserVideos(req, res) {
    res.json('Videos')
}

app.get('api/search-videos', function getFilteredVideos(req,res) {
    let response = videos
        if (req.query.title) {
            response = response.filter(video =>
                video.title.toLowerCase().includes(req.query.title.toLowerCase())
            )
        }
        res.json(response)
    }
)

app.get('api/user-videos', getUserVideos)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})