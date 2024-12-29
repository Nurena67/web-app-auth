import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import sequelize from './config/database.js';
import SequelizeStore from "connect-session-sequelize";
import session from 'express-session';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
//Middleware
// app.use(cors({
  //   credentials: true,
  //   origin: 'https://web-app-auth-seven.vercel.app'
  // }));
  
  const allowedOrigins = [
    'http://localhost:3000',
    'https://web-app-auth-seven.vercel.app'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Jika Anda mengirim cookie
  }));
  
  const sessionStore = SequelizeStore(session.Store);
  const store = new sessionStore({
    db: sequelize
  });
  
  app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
  }));

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

store.sync();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});