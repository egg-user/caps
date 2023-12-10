const express = require('express');
const PORT = process.env.PORT || 3000
const app = express();
const usersRoutes = require('./routes/users');
const middleware = require('./middleware/logs')
require('dotenv').config()


app.use(middleware.logRequest)
//middleware untuk mengizinkan 
app.use(express.json())
app.use((req, res, next) => {
    console.log ('middleware ke dua')
    next()
})

const upload = require('./middleware/multer')

app.use('/users', usersRoutes)

//upload file
app.post('/upload', upload.single('photo'), (req, res) => {
    res.json({
        message: 'Upload berhasil'
    })
})

//middleware upload
app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
    next()
})

app.listen(PORT, () => {
    console.log(`Server berhasil di running di port ${PORT}`);
})