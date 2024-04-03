const handleHome = (req, res, db) => {
    db.select('*').from('eventorganizers')
        .then(users => {
            res.json(users);
        })
        .catch(err => res.status(400).json('Unable to get users'));
}

module.exports = {
    handleHome: handleHome
}