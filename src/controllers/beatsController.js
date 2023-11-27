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
        await beatModel.create(req.body);
        res.status(201).json({ message: 'Beat cadastrada com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar o beat.' });
    }
};

const deleteController = async (req, res) => {
    try {
        const id = req.params.id;
        await beatModel.deleteBeat(id);
        return res.status(200).json({ message: 'Beat excluido com sucesso!' });
    } catch (err) {
        res.status(500).json({message: 'Erro ao deletar o beat.'});
    }
}

const editController = async (req, res) => {
    try {
        await beatModel.editBeat(req.body);
        res.status(201).json({ message: 'Beat editado com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao editar o beat.' });
    }
};

module.exports = {
    selectAllController,
    createController,
    deleteController,
    editController
};