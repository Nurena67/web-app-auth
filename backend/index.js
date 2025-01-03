import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import sequelize from './config/database.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;


//Middleware
// const corsOptions = {
//   origin: 'https://web-app-umber-omega.vercel.app/',
//   credentials: true
// };

app.use(cors());

app.use(express.json());
app.use('/patients', patientRoutes);
app.use(userRoutes);
app.use(authRoutes);

// Sync database
sequelize.sync({ force: false }) // force: false akan mencegah penghapusan tabel yang sudah ada
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.log('Error syncing database: ', err);
  });



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});