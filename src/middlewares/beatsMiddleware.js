const ValidatorUserid = (req, res, next) => {
    const userid = req.params.userid;

    if (userid === undefined || userid === ''){
        return res.status(400).json({ message: 'O campo userid é obrigatório!' });
    }

    next();
};

const ValidatorCreate = (req, res, next) => {
    const { body } = req;

    if (body === undefined || body.userid === undefined || body.categoryid === undefined || body.genderid === undefined || body.name === undefined || body.image === undefined || body.audio === undefined || body.bpm === undefined) return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    if (body === '' || body.userid === '' || body.categoryid === '' || body.genderid === '' || body.name === '' || body.image === '' || body.audio === '' || body.bpm === '') return res.status(400).json({ message: 'Os campos não podem estar vazios!' });

    next();
};

const ValidatorBeatId = (req, res, next) => {

    const beatid = req.params.id;
    
    if (beatid === undefined || beatid === '') return res.status(400).json({ message: 'O parâmetro id é obrigatório!' });

    next();

};

module.exports = {
    ValidatorUserid,
    ValidatorCreate,
    ValidatorBeatId
};