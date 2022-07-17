import { BLOB, STRING } from 'sequelize';
import { server } from '../config/env.js';
import randomId from '../config/random.js';
import sequelize from '../config/sequelize.js';
import Users from './users.js';


const Videos = sequelize.define('videos', {
    videoId: {
        type: STRING,
        primaryKey: true,
    },
    description: {
        type: STRING,
        allowNull: true
    },
    data: {
        type: BLOB,
        allowNull: false
    },
    url: {
        type: STRING
    }
}, {
    tableName: 'videos', hooks: {
        beforeSave: (record) => {
            record.setDataValue('videoId', randomId());
            record.setDataValue('url', `${server}/video/${record.getDataValue('videoId')}/view`);
            return record;
        }
    }
})

Videos.belongsTo(Users, {
    foreignKey: {
        name: 'owner',
        allowNull: false,
    }
})

Users.hasMany(Videos, {
    foreignKey: 'owner'
})


await Videos.sync({
    alter: true
})
export default Videos;
