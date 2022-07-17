import { Router } from 'express';
import Images from '../Model/images.js';
import upload from '../config/multer.js';

const router = Router();

router.post('/image', upload.single('file'), async (req, res) => {
    try {
        const { userId } = req.user;
        if (!userId) throw 'failed';
        const file = req.file;
        const image = await Images.findOne({
            where: { owner: userId }
        }).then(image => {
            if (image) {
                image.data = file.buffer;
                return image.save();
            }
            return Images.create({
                owner: userId, data: file.buffer
            })
        }).then(image => image);
        delete image.dataValues.data;
        res.send(image);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.get('/user/:userId/image', async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) throw 'failed';

        const image = await Images.findOne({
            where: { owner: userId },
            attributes: {
                exclude: ['data']
            }
        });
        res.send(image);
    } catch (err) {
        res.sendStatus(400);
    }
})

router.get('/image/:imageId/view', async (req, res) => {
    try {
        const { imageId } = req.params;
        const image = await Images.findByPk(imageId, {
            attributes: ['data'],
        });
        const data = Buffer.from(image.data, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png',
        })
        res.end(data);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
})

router.delete('/image', async (req, res) => {
    try {
        const { userId } = req.user;
        if (!userId) throw 'failed';
        await Images.destroy({
            where: {
                owner: req.params.userId
            }
        })
        res.send('deleted')
    } catch (err) {
        res.sendStatus(400);
    }
})


export default router;
