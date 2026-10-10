import { userService } from '../services/userService.js';

export const userController = {
  async getAll(req, res) {
    res.json(await userService.getAll());
  },
  async getById(req, res) {
    const user = await userService.getById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  },
  async create(req, res) {
    res.status(201).json(await userService.create(req.body));
  },
  async update(req, res) {
    const user = await userService.update(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  },
  async remove(req, res) {
    const user = await userService.remove(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(204).end();
  }
};
