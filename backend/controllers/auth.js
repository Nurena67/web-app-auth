import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import argon2 from "argon2";

export const Login = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ msg: "Email dan password wajib diisi" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ msg: "Email atau Password salah" });
        }

        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Email atau Password salah" });
        }

        const token = jwt.sign(
            { uuid: user.uuid, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ msg: "Login berhasil", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

export const Me = async (req, res) => {
    try {
        const user = await User.findOne({ where: { uuid: req.userId } });
        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }
        res.json({ name: user.name, email: user.email, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

export const logOut = (req, res) => {
    res.status(200).json({ msg: "Anda telah logout" });
};

