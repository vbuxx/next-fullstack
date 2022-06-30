import db from '../../../libs/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    // console.log(salt);

    const register = await db('users').insert({
        email,
        password: passwordHash
    });

    const registeredUser = await db('users');

    res.status(200);
    res.json({
        message: 'User register successful',
        data: registeredUser
    });
}