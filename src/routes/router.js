const users = require('./userRoutes');
const dashboard = require('./dashboardRoutes');
const clients = require('./clientRoutes');
const categories = require('./categoriesRoutes');
const genders = require('./gendersRoutes');

const routes = (app) => {
    app.use(
        users,
        dashboard,
        clients,
        categories,
        genders
    );
};

module.exports = routes;