const router = require("express").Router();
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeToken(user) {
	const payload = {
		sub: user.id,
		username: user.username
	};

	const options = {
		expiresIn: 60 * 60
	};

	const token = jwt.sign(
		payload,
		process.env.JWT_SECRETE || "thesecret",
		options
	);

	return token;
}

router.post("/register", (req, res) => {
	req.body.password = bcrypt.hashSync(req.body.password, 10);
	Users.add(req.body)
		.then(saved => {
			res.status(201).json(saved);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

router.post("/login", (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = makeToken(user);
				res.status(200).json({
					message: `Welcome ${user.username}!`,
					token
				});
			} else {
				res.status(401).json({ message: "You shall not pass" });
			}
		})
		.catch(error => {
			res.status(500).json({ message: error.message }); // funky {}
		});
});

module.exports = router;