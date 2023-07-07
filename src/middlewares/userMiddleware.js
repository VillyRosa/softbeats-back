const validatorCreate = (req, res, next) => {
    const { body } = req;
    if (body.name === undefined || body.email === undefined || body.password === undefined || body.passwordRepeat === undefined) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    if (body.name === '' || body.email === '' || body.password === '' || body.passwordRepeat === '') {
        return res.status(400).json({ message: 'Os campos não podem estar vazios!' });
    }

    if (body.password !== body.passwordRepeat) return res.status(400).json({ message: 'Senha e repetição não conferem!' });

    next();

};

const validatorLogin = (req, res, next) => {
    const { body } = req;
    if (body.email === undefined || body.password === undefined) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    if (body.email === '' || body.password === '') {
        return res.status(400).json({ message: 'Os campos não podem estar vazios!' });
    }

    next();

};

module.exports = {
    validatorCreate,
    validatorLogin
};