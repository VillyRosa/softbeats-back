const connection = require('./connection');

const create = async (gender) => {
    try {
        const { userid, name, description } = gender;
        const sql = 'INSERT INTO genders (id, user_id, name, description) VALUES (null, ?, ?, ?)';
        const [result] = await connection.execute(sql, [userid, name, description]);
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
        const sql = 'SELECT * FROM genders WHERE user_id = ?';
        const result = await connection.execute(sql, [userid]);
        return result[0];
    } catch (err) {
        return res.status(500).json({
            message: 'Falha ao comunicar com o banco.',
            error: err.message
        });
    };
};

const edit = async (gender) => {
    try {
        const { id, name, description } = gender;
        const sql = 'UPDATE genders SET name=?, description=? WHERE id=?';
        const [result] = await connection.execute(sql, [name, description, id]);
        return result;
    } catch (err) {
        return res.status(500).json({
            message: 'Falha ao comunicar com o banco.',
            error: err.message
        });
    };
};

const deleteGender = async (genderid) => {
    try {
        const sql = 'DELETE FROM genders WHERE id = ?';
        const [result] = await connection.execute(sql, [genderid]);
        return result;
    } catch (err) {
        return res.status(500).json({
            message: 'Falha ao se comunicar com o banco.',
            error: err.message
        });
    };
};

module.exports = {
    create,
    selectAll,
    edit,
    deleteGender
};