import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { promisify } from 'util';

import User from '../models/User';
import { privateKey } from '../credentials/auth';

export default class UserController {
  async insert(req, res) {
    const { name, email, password } = req.body;

    try {
      const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 8),
      });
      return res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      return res.status(500).json({
        message: `There was a problem creating a user: ${error}`,
      });
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    try {
      const { _id, name, email, createdAt, updatedAt } = await User.findById(
        id
      ).exec();
      return res.status(200).json({
        id: _id,
        name,
        email,
        createdAt,
        updatedAt,
      });
    } catch (error) {
      return res.status(404).json({ message: 'The ID informed is invalid' });
    }
  }

  async getAll(req, res) {
    try {
      const users = await User.find().exec();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async removeOne(req, res) {
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(' ');

    const decoded = await promisify(jwt.verify)(token, privateKey);

    const userId = decoded.id;
    const id = req.params.id;

    try {
      const user = await User.findOneAndRemove({
        $and: [{ _id: id }, { _id: userId }],
      }).exec();

      if (!user) {
        res.status(500).json({ message: 'Operation not allowed' });
      } else {
        res.status(200).json({
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
