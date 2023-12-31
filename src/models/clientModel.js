const connection = require('./connection');

const create = async (client) => {
    try {
        const { userid, name, email, telephone, instagram } = client;
        const telephoneFormated = `(${telephone.slice(0, 2)}) ${telephone.slice(2, 7)}-${telephone.slice(7, 11)}`;
        const sql = 'INSERT INTO clients (id, user_id, name, email, telephone, instagram) VALUES (null, ?, ?, ?, ?, ?)';
        const [result] = await connection.execute(sql, [userid, name, email, telephoneFormated, instagram]);

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

const edit = async (client) => {
    try {
        const { id, name, email, telephone, instagram } = client;
        const sql = 'UPDATE clients SET name=?, email=?, telephone=?, instagram=? WHERE id=?';
        const [result] = await connection.execute(sql, [name, email, telephone, instagram, id]);

        return result;
    } catch (err) {
        return res.status(500).json({
            message: 'Falha ao comunicar com o banco.',
            error: err.message
        });
    }
};

const deleteClient = async (clientid) => {
    try {
        const sqlSale = 'DELETE FROM sales WHERE client_id = ?';
        await connection.execute(sqlSale, [clientid]);

        const sql = 'DELETE FROM clients WHERE id = ?';
        const [result] = await connection.execute(sql, [clientid]);
        return result;
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Falha ao se comunicar com o banco.',
            error: err.message
        });
    }
};

module.exports = {
    create,
    selectAll,
    edit,
    deleteClient
};