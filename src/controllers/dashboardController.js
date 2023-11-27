const clientModel = require('../models/clientModel');
const beatModel = require('../models/beatsModel');
const salesModel = require('../models/salesModel');

const select = async (req, res) => {
    try {
        const userid = req.params.userid;
        const clients = await clientModel.selectAll(userid);
        const beats = await beatModel.selectAll(userid);
        const sales = await salesModel.selectAll(userid);

        let total = 0;
        let currentMonth = new Date().getMonth() + 1; // Mês atual
        let monthProfit = 0;

        sales.forEach((sale) => {
            const saleDate = new Date(sale.datetime);
            const saleMonth = saleDate.getMonth() + 1;

            if (saleMonth === currentMonth) {
                monthProfit += sale.price;
            }

            total += sale.price;
        });

        return res.status(200).json({
            totalClients: clients.length,
            totalBeats: beats.length,
            monthProfit,
            totalProfit: total,
        });
    } catch (err) {
        res.status(500).send({ message: 'Informações não encontradas!' });
        console.log(err);
    }
};


module.exports = {
    select
};