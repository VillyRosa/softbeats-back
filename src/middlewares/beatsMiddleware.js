const ValidatorUserid = (req, res, next) => {
    const userid = req.params.userid;

    if (userid === undefined || userid === ''){
        return res.status(400).json({ message: 'O campo userid é obrigatório!' });
    }

    next();
};

const ValidatorCreate = (req, res, next) => {

    console.log(req);

    next();
};

module.exports = {
    ValidatorUserid,
    ValidatorCreate
};