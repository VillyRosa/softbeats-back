const connection = require('./connection');

const create = async (client) => {
    try {
        const { userid, name, email, telephone, instagram } = client;
        const sql = 'INSERT INTO clients (id, user_id, name, email, telephone, instagram) VALUES (null, ?, ?, ?, ?, ?)';
        const [result] = await connection.execute(sql, [userid, name, email, telephone, instagram]);

        try {
            const sqlGetLastClient = 'SELECT id FROM `clients` WHERE user_id=? ORDER BY id DESC LIMIT 1';
            const [resLastClient] = await connection.execute(sqlGetLastClient, [userid]);

            const sqlInsetAddress = 'INSERT INTO address (id, client_id, cep, state, city, neighborhood, street, number, complement) VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?)';
            await connection.execute(sqlInsetAddress, [resLastClient[0].id, client.address.cep, client.address.state, client.address.city, client.address.neighborhood, client.address.street, client.address.number, client.address.complement]);

        } catch(err) {
            return res.status(500).json({
                message: 'Falha ao se comunicar com o banco.',
                error: err.message
            });
        }

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

        for (const client of result[0]) {
            const selectAddress = 'SELECT * FROM address WHERE client_id = ?';
            const resAddress = await connection.execute(selectAddress, [client.id]);
            client.address = {};

            if (resAddress[0][0] !== undefined) {
                client.address = resAddress[0][0];
            }
        }

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

        const updateAddress = 'UPDATE address SET cep=?, state=?, city=?, neighborhood=?, street=?, number=?, complement=? WHERE client_id=?';
        await connection.execute(updateAddress, [client.address.cep, client.address.state, client.address.city, client.address.neighborhood, client.address.street, client.address.number, client.address.complement, id]);

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
        const deleteAddress = 'DELETE FROM address WHERE client_id = ?';
        await connection.execute(deleteAddress, [clientid]);

        const sql = 'DELETE FROM clients WHERE id = ?';
        const [result] = await connection.execute(sql, [clientid]);
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
    deleteClient
};