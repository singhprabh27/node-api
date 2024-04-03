const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const knex = require('knex');
const Register = require('./controllers/Register');
const Signin = require('./controllers/Signin');
const Profile = require('./controllers/profile');
const image = require('./controllers/image');
const Home = require('./controllers/home');
const ServiceProvider = require('./controllers/ServiceProvider');
const Card_ServiceProvider = require('./controllers/Card_ServiceProvider');
const CreateEvent = require('./controllers/CreateEvent2');
const UserEvents = require('./controllers/userEvents');
const JoinusCompany = require('./controllers/JoinusCompanyjs');
const JoinusServiceProvider = require('./controllers/JoinusServiceProvider');
app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'test',
        database: 'event_resource',
    },
});

// app.get('/', (req, res) => {
//     res.send(database.users)
// });
app.get('/', (req, res) => { Home.handleHome(req, res, db); });
app.get('/ServiceProvider', (req, res) => { ServiceProvider.handleServiceProvider(req, res, db); });
app.post('/Signin', (req, res) => { Signin.handleSignin(req, res, db, bcrypt) });
app.post('/Register', (req, res) => { Register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { Profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.get('/Card_ServiceProvider/:id', (req, res) => { Card_ServiceProvider.handleCard_ServiceProvider(req, res, db) });
app.get('/UserEvents/:userid', (req, res) => { UserEvents.handleUserEvents(req, res, db) });
app.post('/CreateEvent', (req, res) => { CreateEvent.handleCreateEvent(req, res, db) });
app.post('/Joinus/Company', (req, res) => { JoinusCompany.handleJoinusCompany(req, res, db) });
app.post('/Joinus/ServiceProvider', (req, res) => { JoinusServiceProvider.handleJoinusServiceProvider(req, res, db) });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
