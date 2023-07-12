const categoryModel = require('../models/gendersModel');

const createController = async(req, res) => {
    try {
        await categoryModel.create(req.body);
        res.status(201).json({ message: 'Gênero cadastrado com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar o gênero.' });
    }
};

const selectAllController = async(req, res) => {
    try {
        const userid = req.params.userid;
        const categories = await categoryModel.selectAll(userid);
        return res.status(200).json(categories);
    } catch(err) {
        res.status(500).send({ message: 'Gêneros não encontrados!' });
    }
};

const editController = async(req, res) => {
    try {
        await categoryModel.edit(req.body);
        res.status(200).json({ message: 'Gênero atualizado com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar a gênero' });
    };
};

const deleteController = async(req, res) => {
    try {
        const id = req.params.id;
        await categoryModel.deleteGender(id);
        return res.status(200).json( { message: 'Gênero excluido com sucesso!' } );
    } catch(err) {
        res.status(500).send({ message: 'Gênero não encontrado!' });
    }
};

module.exports = {
    createController,
    editController,
    selectAllController,
    deleteController
};