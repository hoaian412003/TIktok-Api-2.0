import userRouter from './user.js';
import authRouter, { authMiddleware } from './auth.js';
import followRouter from './follow.js';
import imageRouter from './image.js';
import backupRouter from './backup.js';
import videoRouter from './video.js';
import likeRouter from './like.js';
import commentRouter from './comment.js';


const api = (app) => {

    app.use('/', authMiddleware)
    app.use('/', authRouter);
    app.use('/', userRouter);
    app.use('/', followRouter);
    app.use('/', imageRouter);
    app.use('/', backupRouter);
    app.use('/', videoRouter);
    app.use('/', likeRouter);
    app.use('/', commentRouter);
}

export default api;
