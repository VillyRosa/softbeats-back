const beatModel = require('../models/beatsModel');

const selectAllController = async(req, res) => {
    try {
        const userid = req.params.userid;
        const beats = await beatModel.selectAll(userid);
        return res.status(200).json(beats);
    } catch(err) {
        res.status(500).send({ message: 'Beats não encontrados!' });
    }
};

const createController = async (req, res) => {
    try {
        await beatModel.create();
        res.status(201).json({ message: 'Beat cadastrada com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar o beat.' });
    }
};

module.exports = {
    selectAllController,
    createController
};