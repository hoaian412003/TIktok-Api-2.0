import sequelize from '../config/sequelize.js';
import { STRING } from 'sequelize'
import bcrypt from 'bcrypt';
import randomId from '../config/random.js';

const Users = sequelize.define('users', {
    userId: {
        type: STRING,
        primaryKey: true
    },
    username: {
        type: STRING,
        allowNull: false,
        unique: true,
    },
    nickname: {
        type: STRING,
        allowNull: true
    },
    password: {
        type: STRING,
        allowNull: false
    },
    description: {
        type: STRING,
        allowNull: true
    },
}, {
    tableName: 'users', hooks: {
        beforeSave: (record) => {
            let {password} = record.dataValues;
            password = bcrypt.hashSync(password, 11);
            record.setDataValue('password', password);
            record.setDataValue('userId', randomId())
            return record;
        },
    }
})

await Users.sync({
    alter: true
})

export default Users;
