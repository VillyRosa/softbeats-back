const { format } = require('date-fns-tz');
// const { utcToZonedTime } = require('date-fns');
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

const deleteSale = async (saleid) => {
    try {

        const deleteCascate = 'DELETE FROM sale_itens WHERE sale_id = ?';
        await connection.execute(deleteCascate, [saleid])

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