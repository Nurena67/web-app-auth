import User from '../models/userModel.js'
import argon2 from "argon2";

// Get All Users
export const getUsers = async (req, res) => {
    const { role } = req.query;

    try {
        const whereClause = role ? { role: role } : {};

        const users = await User.findAll({
            attributes:['uuid','name','email','role'],
            where: whereClause
        });

        if (users.length === 0) {
            return res.status(404).json({ msg: 'Tidak ada pengguna dengan role tersebut' });
          }

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

// Get User By ID
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        if (req.userId !== id && req.role !== 'admin') {
            return res.status(403).json({ msg: "Akses terlarang, Anda hanya bisa mengakses data Anda sendiri." });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};


// Create New User
export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Hash password with argon2
        const hashedPassword = await argon2.hash(password);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ msg: "User berhasil dibuat", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

// Update User
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    try {
        // Verifikasi bahwa user yang mengakses adalah pemilik atau admin
        if (req.userId !== id && req.role !== 'admin') {
            return res.status(403).json({ msg: "Akses terlarang" });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }

        // Hash password baru jika ada perubahan
        if (password) {
            user.password = await argon2.hash(password);
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();

        res.json({ msg: "User berhasil diperbarui", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        if (req.userId !== id && req.role !== 'admin') {
            return res.status(403).json({ msg: "Akses terlarang" });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }

        await user.destroy();

        res.json({ msg: "User berhasil dihapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

export const Register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ msg: "Email sudah digunakan" });
        }

        const hashedPassword = await argon2.hash(password);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "nurse"
        });

        res.status(201).json({ msg: "Registrasi berhasil" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

// Get Doctor
export const getDoctors = async (req, res) => {
    try {
      const doctors = await User.findAll({
        attributes: ['id', 'name', 'email', 'role'],
        where: {
          role: 'doctor', 
        },
      });
  
      if (doctors.length === 0) {
        return res.status(404).json({ msg: 'Tidak ada dokter yang ditemukan' });
      }
  
      res.json(doctors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Terjadi kesalahan server' });
    }
  };
  