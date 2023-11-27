const ValidatorUserid = (req, res, next) => {
    const userid = req.params.userid;

    if (userid === undefined || userid === ''){
        return res.status(400).json({ message: 'O campo userid é obrigatório!' });
    }

    next();
};

const ValidatorCreate = (req, res, next) => {
    const { body } = req;

    if (body === undefined || body.userid === undefined || body.categoryid === undefined || body.genderid === undefined || body.name === undefined || body.audio === undefined) return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    if (body === '' || body.userid === '' || body.categoryid === '' || body.genderid === '' || body.name === '' || body.audio === '') return res.status(400).json({ message: 'Os campos não podem estar vazios!' });

    next();
};

const ValidatorBeatId = (req, res, next) => {

    const beatid = req.params.id;
    
    if (beatid === undefined || beatid === '') return res.status(400).json({ message: 'O parâmetro id é obrigatório!' });

    next();

};

const validatorEdit = (req, res, next) => {
    const { body } = req;

    if (body === undefined || body.beatid === undefined){
        return res.status(400).json({ message: 'O campo beatid é obrigatório!' });
    }

    if (body === '' || body.beatid === ''){
        return res.status(400).json({ message: 'O campo beatid não pode estar vazio!' });
    }

    next();
};

module.exports = {
    ValidatorUserid,
    ValidatorCreate,
    ValidatorBeatId,
    validatorEdit
};