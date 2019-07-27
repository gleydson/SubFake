import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import { privateKey } from '../credentials/auth';

export default class SessionController {
  async singIn(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const compare = bcrypt.compareSync(password, user.password);
    if (!compare) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token: jwt.sign({ id: user._id }, privateKey, { expiresIn: '10days' }),
      type_token: 'bearer',
    });
  }
}
