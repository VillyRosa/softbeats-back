const users = require('./userRoutes');
const clients = require('./clientRoutes');

const routes = (app) => {
    app.use(
        users,
        clients,
    );
};

module.exports = routes;