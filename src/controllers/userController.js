const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const config = require('../config');

const create = async(req, res) => {
    try {
        await userModel.create(req.body);
        res.send({ message: 'Usuário criado com sucesso!' });
    } catch(err) {
        res.status(500).send({ message: 'O usuário já existe.' });
    }
};

const login = async(req, res) => {
    const { email, password } = req.body;
    const User = await userModel.login(email);

    if (User) {
        try{
            const { id, name, email } = User;
            bcrypt.compare(password, User.password, (err, result) => {

                if (err) return res.status(401).send({ message: 'Usuário não autenticado.', err: err.message });

                if(result) {
                    return res.status(200).json({
                        id: id,
                        name: name,
                        email: email
                    });
                } else return res.status(401).send({ message: 'Usuário ou senha incorretos.' });
                
            });

        } catch (err){
            res.status(500).send({ message: 'Usuário ou senha incorretos.' });
        }
    } else return res.status(404).send({ message: 'Usuário não encontrado.' });
};

module.exports = {
    create,
    login
};