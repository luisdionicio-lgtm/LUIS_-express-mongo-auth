import User from '../models/User.js';

export const userRepository = {
  getAll: () => User.find(),
  getById: (id) => User.findById(id),
  create: (data) => User.create(data),
  update: (id, data) => User.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  remove: (id) => User.findByIdAndDelete(id)
};
