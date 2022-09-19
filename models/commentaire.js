'use strict';
const Post = require('../models/post')
const User = require('../models/user')
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class commentaire extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // commentaire.belongsTo(User, {
            //     foreignKey: 'userId',
            //     as: 'user'
            // });
            // commentaire.belongsTo(Post, {
            //     foreignKey: 'postId',
            //     as: 'post'
            // });
        }
    }
    commentaire.init({
        userId: {
            type: DataTypes.INTEGER
        },
        postId: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'commentaire',
    });
    return commentaire;
};