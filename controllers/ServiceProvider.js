// const handleServiceProvider = (req, res, db) => {
//     db.select('*').from('serviceproviders')
//         .then(providers => {
//             res.json(providers);
//         })
//         .catch(err => res.status(400).json('Unable to get service providers'));
// }
const handleServiceProvider = (req, res, db) => {
    db.select('serviceproviderid', 'name', 'city', 'servicetype', 'rating', 'image_url').from('serviceproviders')
        .then(providers => {
            res.json(providers);
        })
        .catch(err => res.status(400).json('Unable to get service providers'));
}
module.exports = {
    handleServiceProvider: handleServiceProvider
}