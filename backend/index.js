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

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: sequelize
});

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use((req, res, next) => {
  console.log('Session Middleware Log:');
  console.log('Session ID:', req.session.id); // ID session
  console.log('Session Data:', req.session); // Isi session
  next(); // Lanjutkan ke middleware berikutnya
});

//Middleware
const corsOptions = {
  origin: 'https://web-app-umber-omega.vercel.app',
  credentials: true
};

app.use('/*',cors(corsOptions))

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

// store.sync();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});