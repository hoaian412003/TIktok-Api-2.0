import { Router } from 'express';
import { secret } from '../config/env.js';
import jwt from 'jsonwebtoken';
import Users from '../Model/users.js';
import bcrypt from 'bcrypt';


const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { username, nickname, password, description } = req.body;
        const user = await Users.create({
            username, nickname, password, description
        })
        res.send(user);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({
            where: { username }
        }).then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                return user;
            }
            return null
        })
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                nickname: user.nickname,
                userId: user.userId,
            }
        }, secret, { expiresIn: '1h' });
        const refreshToken = jwt.sign({
            user: {
                username: user.username,
                nickname: user.nickname,
                userId: user.userId
            }
        }, 'cat-refresh', { expiresIn: '365d' });
        res.send({
            accessToken, refreshToken
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.get('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.query;
        const user = jwt.verify(refreshToken, 'cat-refresh').user;
        const accessToken = jwt.sign({ user }, secret, { expiresIn: '1h' });
        res.send(accessToken);
    } catch (err) {
        res.sendStatus(400);
    }
})

export const authMiddleware = async (req, res, next) => {
    try {
        if (['/refresh', '/register', '/login'].includes(req.path)) { next(); return; }
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            next();
            return;
        }
        const accessToken = bearerHeader.split(' ')[1];
        const user = jwt.verify(accessToken, secret).user;
        req.user = user;
        next();
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

export default router;
