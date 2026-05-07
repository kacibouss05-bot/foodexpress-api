import express from 'express'
import dotenv from 'dotenv'
import usersRouter from './routes/users.js'

dotenv.config();
const app =express();
app.use(express.json());
app.use('/users',usersRouter);
const port = process.env.PORT || 3000;
app.listen(port ,()=>{
    console.log('le server lancer sur le port ${port}');
})

export default app;