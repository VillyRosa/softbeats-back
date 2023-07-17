const salesModel = require('../models/salesModel');

const createController = async(req, res) => {
    try {
        await salesModel.create(req.body);
        res.status(201).json({ message: 'Venda cadastrada com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar a venda.' });
    }
};

const selectAllController = async(req, res) => {
    try {
        const userid = req.params.userid;
        const sales = await salesModel.selectAll(userid);
        return res.status(200).json(sales);
    } catch(err) {
        res.status(500).send({ message: 'Vendas não encontrados!' });
    }
};

const editController = async(req, res) => {
    try {
        await salesModel.edit(req.body);
        res.status(200).json({ message: 'Venda atualizada com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar a venda' });
    };
};

const deleteController = async(req, res) => {
    try {
        const id = req.params.id;
        await salesModel.deleteCategory(id);
        return res.status(200).json( { message: 'Venda excluida com sucesso!' } );
    } catch(err) {
        res.status(500).send({ message: 'Venda não encontrada!' });
    }
};

module.exports = {
    createController,
    editController,
    selectAllController,
    deleteController
};