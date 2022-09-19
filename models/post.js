'use strict';
const User = require('../models/user')
const Like = require('../models/user_like_post')


const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Post.belongsTo(models.User, {
                as: "user",
                foreignKey: "userId"
            });
            Post.belongsToMany(models.User, {
                foreignKey: 'postId',
                through: 'user_like_post',
                as: 'like_userId'
            });
            Post.belongsToMany(models.User, {
                foreignKey: 'postId',
                through: 'commentaire',
                as: 'com_userId'
            })
        }
    }
    Post.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        imageAlt: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: "posts",
        modelName: 'Post',
    });
    return Post;
};