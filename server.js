const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const authRoutes = require('./routes/auth');
const debaterRoutes = require('./routes/debater');
const adjudicatorRoutes = require('./routes/adjudicator');
const teamRoutes = require('./routes/team');
const matchRoutes = require('./routes/match');
const championshipRoutes = require('./routes/championship');
const roundsRoutes = require('./routes/round')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/debaters', debaterRoutes);
app.use('/api/adjudicators', adjudicatorRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/championships', championshipRoutes);
app.use('/api/rounds', roundsRoutes);
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});