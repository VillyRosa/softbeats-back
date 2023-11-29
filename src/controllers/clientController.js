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
        const userid = req.params.userid;
        const clients = await clientModel.selectAll(userid);
        return res.status(200).json(clients);
    } catch(err) {
        res.status(500).send({ message: 'Clientes não encontrados!' });
    }
};

const editController = async(req, res) => {
    try {
        await clientModel.edit(req.body);
        res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar o cliente' });
    }
};

const deleteController = async(req, res) => {
    try {
        const id = req.params.id;
        await clientModel.deleteClient(id);
        return res.status(200).json( { message: 'Cliente excluido com sucesso!' } );
    } catch(err) {
        console.log(err);
        res.status(500).send({ message: 'Cliente não encontrados!' });
    }
};

module.exports = {
    createController,
    editController,
    selectAllController,
    deleteController
};