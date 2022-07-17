import { Router } from 'express';
import Users from '../Model/users.js';
import Sequelize, { Op } from 'sequelize';
import Follows from '../Model/follows.js';
import Images from '../Model/images.js';

const router = Router();

router.get('/user/me', async (req, res) => {
    try {
        const { userId } = req.user;
        if (!userId) throw 'failed';
        const user = await Users.findByPk(userId, {
            attributes: {
                include: ['userId', 'username', 'nickname', 'description',
                    [Sequelize.fn('count', Sequelize.col('follower.followId')), 'followerCount'],
                    [Sequelize.fn('count', Sequelize.col('following.followId')), 'followingCount'],
                ]
            },
            include: [{
                model: Follows, as: 'follower', attributes: []
            }, {
                model: Follows, as: 'following', attributes: []
            }, {
                model: Images, foreignKey: 'owner', attributes: { exclude: ['data'] }
            }],
            group: ['users.userId', 'image.imageId']
        })

        res.send(user);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await Users.findByPk(userId, {
            attributes: {
                include: ['userId', 'username', 'nickname', 'description',
                    [Sequelize.fn('count', Sequelize.col('follower.followId')), 'followerCount'],
                    [Sequelize.fn('count', Sequelize.col('following.followId')), 'followingCount']
                ]
            },
            include: [{
                model: Follows, as: 'follower', attributes: []
            }, {
                model: Follows, as: 'following', attributes: []
            }],
            raw: true,
            group: ['users.userId']
        })
        res.send(user);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.get('/users/search', async (req, res) => {
    try {
        const { keyword } = req.query;
        const users = await Users.findAll({
            where: {
                [Op.or]: [
                    { username: { [Op.like]: `%${keyword}%` } },
                    { nickname: { [Op.like]: `%${keyword}%` } },
                ]
            },
            attributes: {
                exclude: ['password'],
                include: ['userId', 'username', 'nickname', 'description',
                    [Sequelize.fn('count', Sequelize.col('follower.followId')), 'followerCount'],
                    [Sequelize.fn('count', Sequelize.col('following.followId')), 'followingCount']
                ]
            },
            include: [{
                model: Follows, as: 'follower', attributes: []
            }, {
                model: Follows, as: 'following', attributes: []
            }, {
                model: Images, foreignKey: 'owner', attributes: { exclude: ['data'] }
            }],
            group: ['users.userId', 'image.imageId']
        })
        res.send(users);
    } catch (err) {
        res.sendStatus(400);
    }
})

export default router;
