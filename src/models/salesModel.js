const { format } = require('date-fns-tz');
const connection = require('./connection');

const create = async (sale) => {
    try {
        const date = new Date();
        const formatDate = format(date, 'yyyy-MM-dd HH:mm:ss');
        console.log(formatDate);

        const { userid, clientid, beatid, price } = sale;
        const sql = 'INSERT INTO sales (id, user_id, client_id, beat_id, price, datetime) VALUES (null, ?, ?, ?, ?, ?)';
        await connection.execute(sql, [userid, clientid, beatid, price, formatDate]);

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Falha ao se comunicar com o banco.',
            error: err.message
        });
    };
};

const selectAll = async (userid) => {
    try {
        const sql = 'SELECT * FROM sales WHERE user_id = ? ORDER BY datetime DESC';
        let result = await connection.execute(sql, [userid]);

        return result[0];
    } catch (err) {
        return res.status(500).json({
            message: 'Falha ao comunicar com o banco.',
            error: err.message
        });
    };
};

const edit = async (sale) => {
    try {
        const { id, clientid, beatid, price } = sale;
        const sql = 'UPDATE sales SET client_id=?, beat_id=?, price=? WHERE id=?';
        const [result] = await connection.execute(sql, [clientid, beatid, price, id]);
        return result;
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Falha ao comunicar com o banco.',
            error: err.message
        });
    };
};

const deleteSale = async (saleid) => {
    try {
        const sql = 'DELETE FROM sales WHERE id = ?';
        const [result] = await connection.execute(sql, [saleid]);
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
    deleteSale
};