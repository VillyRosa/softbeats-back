const connection = require('./connection');

const create = async (category) => {
    try {
        const { userid, name, price, description } = category;
        const sql = 'INSERT INTO categories (id, user_id, name, price, description) VALUES (null, ?, ?, ?, ?)';
        const [result] = await connection.execute(sql, [userid, name, price, description]);
        return result;
    } catch (err) {
        return res.status(500).json({
            message: 'Falha ao se comunicar com o banco.',
            error: err.message
        });
    };
};

const selectAll = async (userid) => {
    try {
        const sql = 'SELECT * FROM categories WHERE user_id = ?';
        const result = await connection.execute(sql, [userid]);
        return result[0];
    } catch (err) {
        return res.status(500).json({
            message: 'Falha ao comunicar com o banco.',
            error: err.message
        });
    };
};

const edit = async (category) => {
    try {
        const { id, name, price, description } = category;
        const sql = 'UPDATE categories SET name=?, price=?, description=? WHERE id=?';
        const [result] = await connection.execute(sql, [name, price, description, id]);
        return result;
    } catch (err) {
        return res.status(500).json({
            message: 'Falha ao comunicar com o banco.',
            error: err.message
        });
    };
};

const deleteCategory = async (categoryid) => {
    try {
        const sql = 'DELETE FROM categories WHERE id = ?';
        const [result] = await connection.execute(sql, [categoryid]);
        return result;
    } catch (err) {
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
    deleteCategory
};