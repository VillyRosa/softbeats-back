const { format } = require('date-fns-tz');
// const { utcToZonedTime } = require('date-fns');
const connection = require('./connection');

const create = async (sale) => {
    try {
        const date = new Date();
        const formatDate = format(date, 'yyyy-MM-dd HH:mm:ss');
        console.log(formatDate);

        const { userid, clientid, itens } = sale;
        const sql = 'INSERT INTO sales (id, user_id, client_id, datetime) VALUES (null, ?, ?, ?)';
        await connection.execute(sql, [userid, clientid, formatDate]);

        const sqlGetLastSale = 'SELECT id FROM `sales` WHERE user_id=? ORDER BY id DESC LIMIT 1';
        const [resLastSale] = await connection.execute(sqlGetLastSale, [userid]);

        itens.forEach(async item => {
            const insertItem = 'INSERT INTO sale_itens (sale_itens_id, sale_id, beat_id, price) VALUES (null, ?, ?, ?)';
            await connection.execute(insertItem, [resLastSale[0].id, item.beatid, item.price])
        });

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
        const sql = 'SELECT * FROM sales WHERE user_id = ?';
        let result = await connection.execute(sql, [userid]);

        for (let sale of result[0]) {
            // console.log(sale.datetime);
            // sale.datetime = format(utcToZonedTime(dataUTC, 'America/Sao_Paulo'), 'yyyy-MM-dd HH:mm:ss');

            const selectItens = 'SELECT * FROM sale_itens WHERE sale_id = ?';
            const resItens = await connection.execute(selectItens, [sale.id]);
      
            sale.itens = resItens[0];

            sale.totalPrice = 0;
            sale.totalPrice = sale.itens.reduce((total, sale) => total + parseFloat(sale.price), 0);
        }

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