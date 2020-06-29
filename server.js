const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(express.json());

const database = {
	users: [
		{
			id: '1',
			name: 'Nishit',
			email: 'nishit@gmail.com',
			password: 'hello',
			entries: 0,
			joined: new Date()
		},
		{
			id: '2',
			name: 'Neha',
			email: 'neha@gmail.com',
			password: 'bye',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id: '5',
			hash: '',
			email: 'nishit@gmail.com'
		}
	]
}

app.use(cors());

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	}
	else{
		res.status(400).json('Error Logging In');
	}
})

app.post('/register', (req, res) => {
	const { email, password, name } = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
});
	database.users.push({
		id: '3',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if (!found) {
		res.status(400).json('Not Found');
	}
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if (!found) {
		res.status(400).json('Not Found');
	}
})

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3001, () => {
	console.log("App is Running on Port 3001");
})