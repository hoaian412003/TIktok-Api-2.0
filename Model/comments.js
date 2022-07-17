import { DATE, INTEGER, STRING } from 'sequelize';
import randomId from '../config/random.js';
import sequelize from '../config/sequelize.js';
import Users from './users.js';
import Videos from './videos.js';

const Comments = sequelize.define('comments', {
    commentId: {
        type: STRING,
        primaryKey: true,
        defaultValue: randomId()
    },
    text: {
        type: STRING
    },
    created_at: {
        type: DATE,
        defaultValue: new Date()
    }
}, { tableName: 'comments' })

Comments.belongsTo(Videos, { foreignKey: { name: 'videoId', allowNull: false } });
Videos.hasMany(Comments, { foreignKey: 'videoId' });

Comments.belongsTo(Users, { foreignKey: { name: 'owner', allowNull: false } });
Users.hasMany(Comments, { foreignKey: 'owner' });

Comments.belongsTo(Comments, {
    foreignKey: {
        name: 'parent',
        allowNull: true
    }
})

await Comments.sync({
    alter: true
})

export default Comments;
