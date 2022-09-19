const db = require('../models');
const { sequelize, Post, Commentaire } = require('../models')


exports.createCommentaire = (req, res, next) => {

    const commentaire = new Commentaire({
        description: req.body.description,
        userId: req.auth.userId,
        postId: req.params.id
    })

    Commentaire.create({...commentaire })
        .then(() => res.status(201).json({ message: 'commentaire enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}


exports.modifyCommentaire = (req, res, next) => {

    const commentaireObject = req.body.description

    Commentaire.findOne({ where: { id: req.params.id } })
        .then(commentaire => {
            if (isAdmin(req.auth.role) || isCreator(commentaire.userId, req.auth.userId)) {

                Commentaire.update({ commentaireObject }, { where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'commentaire modifiée' }))
                    .catch((error) => res.status(401).json({ message: error }))

            } else {
                res.status(401).json({ message: 'Non autorisé' })
            }
        })
        .catch(error => res.status(400).json({ error }))
}


exports.getAllCommentaire = (req, res, next) => {

    const { postId } = req.params.id

    try {
        const result = Commentaire.findAll({
            where: { id: postId },
            attributes: ['id', 'commentaire'],
            include: {
                model: db.users,
                as: 'users',
                attributes: [username]
            }
        })
    } catch {
        (error => res.status(400).json({ error }))
    }

}
exports.getAllCommentaire = () => {
    return Commentaire.findAll({
            include: [{
                model: Commentaire,
                as: "Commentaires",
                attributes: ["id"],
                through: {
                    attributes: ["id", "userId", "description", "updatedAt"],
                },
            }, ],
        })
        .then((Commentaire) => {
            return Commentaire;
        })
        .catch(error => res.status(404).json({ error }))
};































function isAdmin(role) {
    console.log("check de ton role", role);
    if (role === "Admin") {
        console.log("tu es bien admin");
        return true
    }
}

function isCreator(userId, reqAuth) {
    console.log("check si t'es le créateur, ton id", reqAuth);
    console.log("l'Id du créateur", userId);
    if (userId === reqAuth) {
        console.log("tu es bien le créateur");
        return true
    }
}