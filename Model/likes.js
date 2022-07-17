import { STRING } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Videos from './videos.js';
import Users from './users.js';
import randomId from '../config/random.js';

const Likes = sequelize.define('likes', {
    likeId: {
        type: STRING,
        primaryKey: true,
        defaultValue: randomId()
    }
}, {
    tableName: 'likes',
    indexes: [{
        unique: true,
        fields: ['videoId', 'owner']
    }]
        
})

Likes.belongsTo(Videos, {
    foreignKey: {
        name: 'videoId',
        allowNull: false
    }
})

Likes.belongsTo(Users, {
    foreignKey: {
        name: 'owner',
        allowNull: false
    }
})

Users.hasMany(Likes, {
    foreignKey: {
        name: 'owner',
        allowNull: true
    }
})

Videos.hasMany(Likes, {
    foreignKey: {
        name: 'videoId',
        allowNull: true
    }
})

await Likes.sync({
    alter: true
})

export default Likes;
