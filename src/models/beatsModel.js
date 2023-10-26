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

const create = async (beat) => {
    try {
        const { userid, categoryid, genderid, description, name, image, audio } = beat;
        const sql = 'INSERT INTO beats (id, user_id, category_id, gender_id, description, name, image, audio) VALUES (null, ?, ?, ?, ?, ?, ?, ?)';
        console.log(beat);
        const [result] = await connection.execute(sql, [userid, categoryid, genderid, description, name, image, audio]);
        return result;
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Falha ao se comunicar com o banco.',
            error: err.message
        });
    };
};

const deleteBeat = async (beatId) => {
    try {
        const id = beatId;
        const sql = 'DELETE FROM beats WHERE id = ?';
        const [result] = await connection.execute(sql, [id]);
        return result;
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Falha ao se comunicar com o banco.',
            error: err.message
        });
    }
}

module.exports = {
    create,
    selectAll,
    deleteBeat
};