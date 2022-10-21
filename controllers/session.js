
const Role = {
    admin: 'admin',
    user: 'user',
};

class User {
    constructor() {
    }

    id = 0;
    name = '';
    email = '';
    role = Role.User;
}

module.exports = { Role, User };