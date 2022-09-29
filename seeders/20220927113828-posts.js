'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('posts', [{
            userId: 1,
            description: "Ceci est le tout premier post",
            imageUrl: "",
            imageAlt: "",
            nb_likes: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            userId: 1,
            description: "Ceci est le deuxieme post",
            imageUrl: "",
            imageAlt: "",
            nb_likes: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            userId: 2,
            description: "Ceci est le troisieme post",
            imageUrl: "",
            imageAlt: "",
            nb_likes: 25,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            userId: 3,
            description: "Ceci est le quatrieme post",
            imageUrl: "",
            imageAlt: "",
            nb_likes: 12,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            userId: 3,
            description: "Ceci est le cinquieme post",
            imageUrl: "",
            imageAlt: "",
            nb_likes: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }, ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('posts', null, {});
    }
};