const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

const users = [{ name: 'Name'}]

app.get('/users', (req, res) => {res.json(users)})

app.post('/users', async(req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        //arg 10 is the number of rounds
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user =  { name: req.body.name, password: hashedPassword }
    users.push(user)
    res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
    // "==" for comparison, and "=" for assignment
    const user = users.find ((user) => user.name == req.body.name)

    // checks if there is not user / user == undefined or user == null

    if (!user || user == null || user == undefined) {
        return res.status(400).send("not registered")
    }

    // checks password accuracy
    const isPassword = await bcrypt.compare(req.body.password, user.password)

    if (isPassword) {
        res.send("Successfully logged-in!")
    } else {
        res.send("Unsuccessful entry")
        
    }

})

app.listen(3000)