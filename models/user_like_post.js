'use strict';
const Post = require('../models/post')
const User = require('../models/user')
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user_like_post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // user_like_post.belongsTo(User, {
            //     foreignKey: 'userId',
            //     as: 'user'
            // });
            // user_like_post.belongsTo(Post, {
            //     foreignKey: 'postId',
            //     as: 'post'
            // });
        }
    }
    user_like_post.init({
        userId: {
            type: DataTypes.INTEGER
        },
        postId: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'user_like_post',
    });
    return user_like_post;
};