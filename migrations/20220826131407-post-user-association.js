'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint('posts', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'post_user_association',
            references: {
                table: 'users',
                field: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'

        })
    },

    async down(queryInterface, Sequelize) {
        queryInterface.removeConstraint('posts', 'post_user_association');

    }
};