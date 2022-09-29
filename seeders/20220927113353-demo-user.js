'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{
            username: 'John',
            password: 'test1',
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            username: 'Jane',
            password: 'test1',
            role: 'Admin',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            username: 'Jo',
            password: 'test1',
            role: 'Admin',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            username: 'Gustave',
            password: 'test1',
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            username: 'Geraldine',
            password: 'test1',
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
        }, ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};