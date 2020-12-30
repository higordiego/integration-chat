(async () => {
    require('dotenv').config()
    const authenticateRocket = (user, password) => rocketChatClient.login(user, password)

    const RocketChatApi = require('rocketchat-api')
    const rocketChatClient = new RocketChatApi('http', 'localhost', 3000)
    await authenticateRocket('user', 'pass')
    const { findOne, findAll } = require('./src/asbtract')

    const enterprise = await findAll('companies', {})

    for (let i = 0; i < enterprise.length; i++) {
        const element = enterprise[i]
        const users = await findAll('users', { company: element._id }, { fields: { email: 1, username: 1, firstname: 1, lastname: 1}})
        const { group }  = await rocketChatClient.groups.create(element._id)
        for (let index = 0; index < users.length; index++) {
            const userDb = users[index]
            const { user  } = await rocketChatClient.users.create({
                "name": `${userDb.firstname} ${userDb.lastname}`,
                "email": userDb.email,
                "password": "@!123456",
                "username": userDb.username,
                "sendWelcomeEmail": false,
                "joinDefaultChannels": false,
                "verified": true,
                "requirePasswordChange":false,
                "roles":["user"]
            })
            await rocketChatClient.groups.invite(group._id, user._id)
        }
    }
})()