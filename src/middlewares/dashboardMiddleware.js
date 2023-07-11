const ValidatorUserid = (req, res, next) => {
    const userid = req.params.userid;

    if (userid === undefined || userid === ''){
        return res.status(400).json({ message: 'O campo userid é obrigatório!' });
    }

    next();
};

module.exports = {
    ValidatorUserid
};