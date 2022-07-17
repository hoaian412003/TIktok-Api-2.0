import { BLOB, DATE, STRING } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Users from './users.js';
import { server } from '../config/env.js';
import randomId from '../config/random.js';

const Images = sequelize.define('images', {
    imageId: {
        type: STRING,
        primaryKey: true
    },
    data: {
        type: BLOB,
        allowNull: false
    },
    url: {
        type: STRING,
    },
}, {
    tableName: 'images',
    hooks: {
        beforeSave: (record) => {
            if (!record.imageId) record.setDataValue('imageId', randomId());
            record.setDataValue('url', `${server}/image/${record.getDataValue('imageId')}/view`);
            return record
        }
    }
})

Images.belongsTo(Users, {
    foreignKey: {
        name: 'owner',
        allowNull: false
    }
});

Users.hasOne(Images, {
    foreignKey: 'owner',
})

await Images.sync({
    alter: true
})

export default Images;
