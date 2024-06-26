const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
    // use transaction to insert data in  both database
    db.transaction(trx => {
        trx.insert(
            {
                hash: hash,
                email: email,
            }
        )
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert(
                        {
                            email: loginEmail[0].email,
                            name: name,
                            joined: new Date(),
                        }
                    ).then(user => {
                        res.json(user[0]);
                    }).catch(err => res.status(400).json('unable to join'))
            }).then(trx.commit)
            .catch(trx.rollback)
    })
}

module.exports = {
    handleRegister: handleRegister
}