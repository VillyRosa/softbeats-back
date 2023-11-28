const connection = require('./connection');
const fs = require('fs').promises;
const path = require('path');

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
        let { userid, categoryid, genderid, description, name, image, audio, bpm } = beat;
        if (!bpm) bpm = 0;
        const sql = 'INSERT INTO beats (id, user_id, category_id, gender_id, description, name, image, audio, bpm) VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?)';
        console.log(beat);
        const [result] = await connection.execute(sql, [userid, categoryid, genderid, description, name, image, audio, bpm]);
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

        const sqlAssets = 'SELECT image, audio FROM beats WHERE id=?';
        const resAssets = await connection.execute(sqlAssets, [id]);
        
        const image = resAssets[0][0].image;
        const audio = resAssets[0][0].audio;

        const imageFilePath = path.join(__dirname, '../../uploads/images', image);
        const audioFilePath = path.join(__dirname, '../../uploads/audios', audio);

        if (image !== 'logo-padrao.png') await fs.unlink(imageFilePath);
        await fs.unlink(audioFilePath);

        const sqlForingSales = 'DELETE FROM sales WHERE beat_id=?';
        await connection.execute(sqlForingSales, [id]);

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

const editBeat = async (beat) => {
    try {
        let { beatid, categoryid, genderid, description, name, image, audio, bpm } = beat;

        const sqlAssets = 'SELECT image, audio FROM beats WHERE id=?';
        const resAssets = await connection.execute(sqlAssets, [beatid]);
        
        const oldImage = resAssets[0][0].image;
        const oldAudio = resAssets[0][0].audio;

        if (image === '' || image === undefined) {
            image = oldImage;
        } else {
            const imageFilePath = path.join(__dirname, '../../uploads/images', oldImage);
            if (oldImage !== 'logo-padrao.png') await fs.unlink(imageFilePath);
        }

        if (audio === '' || audio === undefined) {
            audio = oldAudio;
        } else {
            const audioFilePath = path.join(__dirname, '../../uploads/audios', oldAudio);
            await fs.unlink(audioFilePath);
        }

        const sql = 'UPDATE beats SET category_id=?, gender_id=?, description=?, name=?, image=?, audio=?, bpm=? WHERE id=?';
        const [result] = await connection.execute(sql, [categoryid, genderid, description, name, image, audio, bpm, beatid]);
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
    deleteBeat,
    editBeat
};