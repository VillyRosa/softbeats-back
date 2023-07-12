const validatorCreate = (req, res, next) => {
    const { body } = req;
    if (body.userid === undefined || body.name === undefined) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    if (body.userid === '' || body.name === '') return res.status(400).json({ message: 'Os campos não podem estar vazios!' });

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

    if (userid === undefined || userid === ''){
        return res.status(400).json({ message: 'O campo userid é obrigatório!' });
    }

    next();
};

const ValidatorGenderId = (req, res, next) => {
    const id = req.params.id;

    if (id === undefined || id === ''){
        return res.status(400).json({ message: 'O campo id é obrigatório!' });
    }

    next();
};

module.exports = {
    validatorCreate,
    validatorEdit,
    ValidatorUserid,
    ValidatorGenderId
};