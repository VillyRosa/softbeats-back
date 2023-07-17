const clientModel = require('../models/clientModel');
const beatModel = require('../models/beatsModel');

const select = async(req, res) => {
    try {
        const userid = req.params.userid;
        const clients = await clientModel.selectAll(userid);
        const beats = await beatModel.selectAll(userid);

        return res.status(200).json({
            totalClients: clients.length,
            totalBeats: beats.length,
            monthProfit: 354.00,
            totalProfit: 8547.42
        });
    } catch(err) {
        res.status(500).send({ message: 'Informações não encontrados!' });
    }
};

module.exports = {
    select
};