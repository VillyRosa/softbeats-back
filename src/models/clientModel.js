const connection = require('./connection');

const create = async (client) => {
    try {
        const { userid, name, email, telephone, instagram } = client;
        const sql = 'INSERT INTO clients (id, user_id, name, email, telephone, instagram) VALUES (null, ?, ?, ?, ?, ?)';
        const [result] = await connection.execute(sql, [userid, name, email, telephone, instagram]);
        return result;
    } catch (err) {
        return res.status(500).json({
            message: 'Falha ao se comunicar com o banco.',
            error: err.message
        });
    }
};

const selectAll = async (userid) => {
    try {
        const sql = 'SELECT * FROM clients WHERE user_id = ?';
        const result = await connection.execute(sql, [userid]);
        return result[0];
    } catch (err) {
        return res.status(500).json({
            message: 'Falha ao comunicar com o banco.',
            error: err.message
        });
    }
};

module.exports = {
    create,
    selectAll
};