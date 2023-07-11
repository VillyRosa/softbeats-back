const connection = require('./connection');
const bcrypt = require('bcrypt');

const create = async (User) => {
    try {
        const { name, email, password } = User;
        const hash = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO users (id, name, email, password) VALUES (null, ?, ?, ?)';
        const [result] = await connection.execute(sql, [name, email, hash]);

        const sqluserid = 'SELECT id FROM users ORDER BY id DESC LIMIT 1;';
        const [userid] = await connection.execute(sqluserid);

        const sqlCategories = 'INSERT INTO categories (id, user_id, name, price, description) VALUES (null, ?, ?, ?, ?)';
        await connection.execute(sqlCategories, [userid[0].id, 'Lease', '80', 'Beat lease']);
        await connection.execute(sqlCategories, [userid[0].id, 'Exclusivo', '300', 'Beat exclusivo']);
        await connection.execute(sqlCategories, [userid[0].id, 'Encomenda', '1000', 'Beat por encomenda']);

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