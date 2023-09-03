import User from '../models/userModel.js';

exports.getAllUsers = (pageOptions) => {
    return new Promise((resolve, reject) => {
        User.paginate({}, pageOptions, (err, users) => {        
            if (err) reject(err);
            resolve(users);
        }); 
    });
}


exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id)
            .select('-hash_password') // Loại bỏ trường password
            .exec((err, user) => {
                if (err) reject(err);
                resolve(user);
            });
    });
}
