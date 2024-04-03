const handleCard_ServiceProvider = (req, res, db) => {
    const { id } = req.params;
    db.select('phone', 'email','description','skills','rating','experience').from('serviceproviders').where({ serviceproviderid: id }) // find user in database with same id
        .then(user => {
            if (user.length) // if user exist length exists
            {
                res.json(user[0]);
            }
            else {
                res.status(404).json({
                    message: "User not found"
                })
            }
        }).catch(err => res.status(400).json('unable to get user profile'));
};

module.exports = {
    handleCard_ServiceProvider: handleCard_ServiceProvider
}