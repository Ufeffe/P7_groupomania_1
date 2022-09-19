const { sequelize, Post } = require('../models')
const Like = require('../models/user_like_post')(sequelize);
const fs = require('fs');


// Création d'une nouvelle post à partir d'un model
exports.createPost = (req, res, next) => {
    console.log("etape 1 demande globale", req.body);

    const post = new Post({
        description: req.body.description,
        userId: req.auth.userId,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
    console.log('etape 2 le post contient :', post);
    post.save()
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.modifyPost = (req, res, next) => {
    // Recherche et récupération du lien image sinon importation classique
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body }
    console.log("postObject", postObject);

    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            console.log("comparaison des userId", post.userId, req.auth.userId);
            console.log("ton role", req.auth.role);
            if (isAdmin(req.auth.role) || isCreator(post.userId, req.auth.userId)) {
                console.log("user autorisé", postObject);
                Post.update({...postObject }, { where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Post modifiée' }))
                    .catch((error) => res.status(401).json({ message: error }))
            } else {
                res.status(401).json({ message: 'Non autorisé' })
            }
        })
        .catch(error => res.status(400).json({ error }))
}

exports.deletePost = (req, res, next) => {
    console.log("debut suppression");
    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            console.log("comparaison des userId");
            if (isAdmin(req.auth.role) || isCreator(post.userId, req.auth.userId)) {
                console.log("suppression etape 1");
                Post.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Post supprimée !' }))
                    .catch((error) => res.status(401).json({ message: error }))
                    // Récupération du nom de fichier pour suppression des données images de la bdd
                    // const filename = post.imageUrl.split('/images/')[1]
                    // fs.unlink(`images/${filename}`, () => {
                    //     console.log("suppression etape 2");
                    // })
            } else {
                res.status(401).json({ message: 'Non autorisé' })
            }
        })
        .catch(error => res.status(500).json({ message: error }))
}

exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }))
}

exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }))
}

// exports.likePost = (req, res, next) => {

//     Post.findOne({ where: { id: req.params.id } })
//         .then((post) => {
//             console.log(post);
//             // recuperation de l'id depuis le service auth
//             const userIdToAdd = parseInt(req.auth.userId)
//             const postId = parseInt(req.params.id)
//             console.log("userId", userIdToAdd);
//             console.log("postId", postId);

//             const dataToAdd = {
//                 userId: userIdToAdd,
//                 postId: postId
//             }
//             console.log(dataToAdd);


//             models.Like.addUser(dataToAdd)
//                 .then(() => res.status(200).json({ message: 'Post Liked' }))
//                 .catch((error) => res.status(409).json({ message: error }))
//             Post.update({
//                     likes: post.likes++
//                 }, { where: { id: req.params.id } })
//                 .then(() => res.status(200).json({ message: '+1 au like' }))
//                 .catch((error) => res.status(400).json({ message: error }))


//             // Option like 
//             if (!idIsPresent(userIdToAdd, post.userLiked)) {
//                 console.log("j'aime le contenu");
//                 console.log("-------log de post.userLiked 1", post.userLiked);
//                 post.userLiked.push(userIdToAdd)
//                 console.log("log de post.userLiked 2------- ", post.userLiked);
//                 post.likes++
//             } else {
//                 idToDelete(userIdToAdd, userLiked)
//                 post.likes--
//             }


//             // console.log("Avant sauvegarde");
//             // console.log(post);
//             // Post.update({ 'userLiked': sequelize.fn('array_append', sequelize.col('userLiked'), userIdToAdd) }, { where: { 'id': req.params.id } })
//             //     .then(() => {
//             //         post.save()
//             //             .then(() => res.status(201).json({ message: 'Post Liked/Disliked !' }))
//             //             .catch(error => res.status(400).json({ error }))
//             //     })
//             //     .catch((error) => res.status(401).json({ message: error }))

//             // Post.update({ 'userLiked': sequelize.fn('array_append', sequelize.col('userLiked'), userIdToAdd), 'likes': likes++ }, { where: { 'id': req.params.id } })
//             //     .then(() => res.status(200).json({ message: 'Post Liked/Disliked' }))
//             //     .catch((error) => res.status(401).json({ message: error }))

//             // post.save()
//             //     .then(() => res.status(201).json({ message: 'Post Liked/Disliked !' }))
//             //     .catch(error => res.status(400).json({ error }));
//             // Post.update({...post }, { where: { id: req.params.id } })
//             //     .then(() => res.status(200).json({ message: 'Post Liked/Disliked' }))
//             //     .catch((error) => res.status(401).json({ message: error }))
//         })
//         .catch(error => res.status(400).json({ error }))
// }

// Vérifie si l'utilisateur a déjà like le post dans la join table
function isLiked(userId, postId) {
    console.log("début vérif is Liked");
    console.log(userId, postId);
    if (userfound) {
        Like.findOne({
                where: {
                    userId: userId,
                    postId: postId
                }
            })
            .then(() => {
                console.log(userfound);
                return true
            })
            .catch(() => res.status(400).json({ message: "impossible de vérif" }))
    }
}


// Permet de connaitre la position de l'id dans un tableau
function idToDelete(userId, array) {
    const idFinder = array.indexOf(array.find(id => id == userId))
    array.splice(idFinder, 1)
}
// Permet de savoir si l'id est présent dans un tableau
function idIsPresent(userId, array) {
    return array.includes(userId)
}

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




// exports.likePost = (req, res, next) => {
//     console.log("debut du like");
//     Post.findOne({ where: { id: req.params.id } })
//         .then((postFinder) => {
//             {
//                 postId: postFinder.id
//             }
//             return postFinder
//         }).then((user) => {
//             console.log("--------------------------------------------------", user);
//             return user({
//                 userId: parseInt(req.auth.userId)
//             })
//         }).then((post_user) => console.log(post_user))
//         .catch(error => res.status(400).json({ error }))
// }



exports.likePost = (req, res, next) => {
    const userIdToAdd = parseInt(req.auth.userId)
    const postId = parseInt(req.params.id)

    Like.create({
            postId: postId,
            userId: userIdToAdd
        })
        .then(postUpdate(() => {
            Post.findOne({ where: { id: req.params.id } })
                .then(post => {
                    post.likes++
                        post.save()
                        .then(() => res.status(200).json({ message: 'Post liked' }))
                        .catch((error) => res.status(401).json({ message: error }))
                })
        }))
        .catch((error) => res.status(400).json({ message: error }))
}