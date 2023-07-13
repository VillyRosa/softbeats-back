const connection = require('./connection');

const selectAll = async (userid) => {
    try {
        const sql = 'SELECT * FROM beats WHERE user_id = ?';
        const result = await connection.execute(sql, [userid]);
        return result[0];
    } catch (err) {
        return res.status(500).json({
            message: 'Falha ao comunicar com o banco.',
            error: err.message
        });
    };
};

module.exports = {
    selectAll,
};