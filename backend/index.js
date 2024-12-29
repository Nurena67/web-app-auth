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
  saveUninitialized: true,
  store: store,
  cookie: {
      secure: 'auto'
  }
}));

//Middleware
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use('/patients', patientRoutes);
app.use(userRoutes);
app.use(authRoutes);

// Sync database
sequelize.sync({ force: true }) // force: false akan mencegah penghapusan tabel yang sudah ada
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.log('Error syncing database: ', err);
  });

store.sync();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost ${PORT}`);
});