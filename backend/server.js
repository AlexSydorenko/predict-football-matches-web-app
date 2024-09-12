import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectToMongoDB from './db/connectToMongoDB.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import fixtureRoutes from './routes/fixture.routes.js';
import predictionRoutes from './routes/prediction.routes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/fixtures', fixtureRoutes);
app.use('/api/predictions', predictionRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server listening on port ${PORT}`);
});
