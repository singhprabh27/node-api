const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('imgEntries', 1)
        .returning('imgEntries')
        .then(imgEntries => { res.json(imgEntries[0].imgEntries); })
        .catch(err => res.status(400).json('unable to get img entries'));
};

module.exports = {
    handleImage: handleImage
}