const clientModel = require('../models/clientModel');

const select = async(req, res) => {
    try {
        const userid = req.params.userid;
        const clients = await clientModel.selectAll(userid);
        return res.status(200).json({
            totalClients: clients.length,
            totalBeats: 0,
            monthProfit: 0,
            totalProfit: 0
        });
    } catch(err) {
        res.status(500).send({ message: 'Clientes não encontrados!' });
    }
};

module.exports = {
    select
};