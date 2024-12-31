import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import resumeRoutes from './routes/resume';
import coverLetterRoutes from './routes/coverLetter';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/resume', resumeRoutes);
app.use('/api/cover-letters', coverLetterRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app; 