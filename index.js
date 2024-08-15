const express = require('express');
const { PORT } = require('./config/config');
const routes = require('./routes');

const app = express();
app.use(express.json());

app.use('/', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
