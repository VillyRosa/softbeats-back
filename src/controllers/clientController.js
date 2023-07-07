const clientModel = require('../models/clientModel');

const createController = async(req, res) => {
    try {
        await clientModel.create(req.body);
        res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar o cliente.' });
    }
};

const selectAllController = async(req, res) => {
    try {
        const { userid } = req.query;
        const clients = await clientModel.selectAll(userid);
        return res.status(200).json(clients);
    } catch(err) {
        res.status(500).send({ message: 'Clientes não encontrados!' });
    }
};

module.exports = {
    createController,
    selectAllController
};