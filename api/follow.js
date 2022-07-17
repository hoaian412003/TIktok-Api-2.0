import { Router } from 'express';
import Follows from '../Model/follows.js';
import Users from '../Model/users.js';
import Images from '../Model/images.js';

const router = Router();

router.post('/follow', async (req, res) => {
    try {
        const owner = req.user?.userId;
        if (!owner) throw 'failed';
        const { userId: follower } = req.body;
        const follow = await Follows.create({
            owner, follower
        })
        res.send(follow);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.get('/follow/:userId', async (req, res) => {
    try {
        const owner = req.user?.userId;
        if (!owner) throw 'failed';
        const { userId: follower } = req.params;
        const follow = await Follows.findOne({
            where: { owner, follower }, raw: true
        });
        res.send(follow);
    } catch (err) {
        res.sendStatus(400);
    }
})

router.get('/followers', async (req, res) => {
    try {
        const owner = req.user?.userId;
        if (!owner) throw 'failed';
        const followers = await Follows.findAll({
            where: { follower: owner },
            include: [
                { model: Users, as: 'follower', attributes: ['username', 'nickname'], include: [{ model: Images }] }
            ]
        })
        res.send(followers);
    } catch (err) {
        res.sendStatus(400);
    }
})

router.get('/following', async (req, res) => {
    try {
        const owner = req.user?.userId;
        const follows = await Follows.findAll({
            where: { owner },
            include: [
                { model: Users, foreignKey: 'owner', attributes: ['username', 'nickname'], include: [{ model: Images }] }
            ]
        });
        res.send(follows);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

export default router;
