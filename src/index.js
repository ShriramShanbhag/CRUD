import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import chatRoutes from './routes/chat.routes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors())
// Routes
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)
// Error Handling Middleware

app.get('/',  async (req, res) => {
        res.send(`App live`);
    }
);

app.use(errorHandler);

// server running on port
app.listen(process.env.PORT, () => {
    console.log("Listening to port " + process.env.PORT);
});