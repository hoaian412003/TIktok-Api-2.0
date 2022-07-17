import { STRING } from 'sequelize';
import randomId from '../config/random.js';
import sequelize from '../config/sequelize.js';
import Users from './users.js';

const Follows = sequelize.define('follows', {
    followId: {
        type: STRING,
        primaryKey: true,
        defaultValue: randomId()
    },
}, {
    tableName: 'follows', timestamps: true,
    indexes: [{ unique: true, fields: ['follower', 'owner'] }]
})

Users.hasMany(Follows, {
    foreignKey: 'owner',
    as: 'following'
});

Users.hasMany(Follows, {
    foreignKey: 'follower',
    as: 'follower'
})

Follows.belongsTo(Users, {
    foreignKey: {
        name: 'owner',
        allowNull: false,
    }
})

Follows.belongsTo(Users, {
    foreignKey: {
        name: 'follower',
        allowNull: false,
    },
})

await Follows.sync({
    alter: true
})

export default Follows;
