const connection = require('./connection');
const bcrypt = require('bcrypt');

const create = async (User) => {
    try {
        const { name, email, password } = User;
        const hash = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO users (id, name, email, password) VALUES (null, ?, ?, ?)';
        const [result] = await connection.execute(sql, [name, email, hash]);

        return result;
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            throw new Error();
        }
        throw err;
    }
};

const login = async(User) => {
    try{
        const sql = 'SELECT * FROM users WHERE email = ?';
        const result = await connection.execute(sql, [User]);

        return result[0][0];
    } catch(err) {
        throw new Error();
    }
};

module.exports = {
    create,
    login
};