import User from '../models/userModel.js';

exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id, (err, user) => {
            if (err) reject(err);
            resolve(user);
        });
    });
}
