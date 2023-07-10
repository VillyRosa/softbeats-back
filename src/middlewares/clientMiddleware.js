const validatorCreate = (req, res, next) => {
    const { body } = req;
    if (body.userid === undefined || body.name === undefined || body.email === undefined || body.telephone === undefined || body.instagram === undefined) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    if (body.userid === '' || body.name === '' || body.email === '' || body.telephone === '' || body.instagram === '') return res.status(400).json({ message: 'Os campos não podem estar vazios!' });

    if (body.password !== body.passwordRepeat) return res.status(400).json({ message: 'Senha e repetição não conferem!' });

    next();

};

const validatorEdit = (req, res, next) => {
    const { body } = req;
    if (body.id === undefined) return res.status(400).json({ message: 'O campo id é obrigatório!' });
    if (body.id === '') return res.status(400).json({ message: 'O campo id não pode ser vazio!' });

    next();
};

const ValidatorUserid = (req, res, next) => {
    const userid = req.params.userid;

    if(userid === undefined || userid === ''){
        return res.status(400).json({ message: 'O campo userid é obrigatório!' });
    }

    next();
};

const ValidatorClientId = (req, res, next) => {
    const id = req.params.id;
    console.log(id)

    if(id === undefined || id === ''){
        return res.status(400).json({ message: 'O campo id é obrigatório!' });
    }

    next();
};

module.exports = {
    validatorCreate,
    validatorEdit,
    ValidatorUserid,
    ValidatorClientId
};