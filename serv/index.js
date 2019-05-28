require('dotenv').config()

const app = require('./main')

const port = 4000

app.listen(port, () => console.log(`Server started on port: ${port}`))
