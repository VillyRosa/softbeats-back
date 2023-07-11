const categoryModel = require('../models/categoriesModel');

const createController = async(req, res) => {
    try {
        await categoryModel.create(req.body);
        res.status(201).json({ message: 'Categoria cadastrada com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar a categoria.' });
    }
};

const selectAllController = async(req, res) => {
    try {
        const userid = req.params.userid;
        const categories = await categoryModel.selectAll(userid);
        return res.status(200).json(categories);
    } catch(err) {
        res.status(500).send({ message: 'Categorias não encontrados!' });
    }
};

const editController = async(req, res) => {
    try {
        await categoryModel.edit(req.body);
        res.status(200).json({ message: 'Categoria atualizada com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar a categoria' });
    };
};

const deleteController = async(req, res) => {
    try {
        const id = req.params.id;
        await categoryModel.deleteCategory(id);
        return res.status(200).json( { message: 'Categoria excluida com sucesso!' } );
    } catch(err) {
        res.status(500).send({ message: 'Categoria não encontrada!' });
    }
};

module.exports = {
    createController,
    editController,
    selectAllController,
    deleteController
};