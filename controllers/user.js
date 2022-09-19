const { sequelize, User } = require('../models')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {

            console.log(hash)
            console.log("user avant créa", req.body)


            const user = User.build({
                username: req.body.username,
                password: hash,
                role: req.body.role
            })

            console.log("user créa", user)

            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    User.findOne({ where: { username: req.body.username } })
        .then(user => {
            console.log(req.body, user);
            if (user === null) {
                res.status(401).json({ message: 'Paire identifiant/mdp incorrecte' })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'Paire identifiant/mdp incorrecte' })
                        } else {
                            res.status(200).json({
                                userId: user.id,
                                token: jwt.sign({
                                        userId: user.id,
                                        uuid: user.uuid
                                    },
                                    'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                                )
                            })
                        }
                    })
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))
}