const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body; // email,password entered in frontend 
    db.select('email', 'hash').from('login') // compare email
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash); // compare password
            // console.log(isValid);
            if (isValid) {
                // console.log(isValid);
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        // console.log(user);
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json('error 1 line 81'))
            }
            else {
                res.status(400).json('WRONG CREDENTIALS')
            }
        }
        ).catch(err => res.status(400).json('WRONG CREDENTIALS'))
};

module.exports = {
    handleSignin: handleSignin
}