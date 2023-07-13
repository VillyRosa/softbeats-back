const beatModel = require('../models/beatsModel');

const selectAllController = async(req, res) => {
    try {
        const userid = req.params.userid;
        const beats = await beatModel.selectAll(userid);
        return res.status(200).json(beats);
    } catch(err) {
        res.status(500).send({ message: 'Beats não encontrados!' });
    }
};

module.exports = {
    selectAllController,
};