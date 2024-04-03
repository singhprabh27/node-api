// JoinusServiceProvider.js

// Import any required modules
const handleJoinusServiceProvider = (req, res, db) => {
    const { name, email, phone, servicetype, description, skills, rating, experience, image_url, city } = req.body;

    // Here you can perform any validation or sanitation of the input data if needed

    // Insert the data into the "serviceproviders" table
    db('serviceproviders')
        .returning('*')
        .insert({
            name: name,
            email: email,
            phone: phone,
            servicetype: servicetype,
            description: description,
            skills: skills,
            rating: rating,
            experience: experience,
            image_url: image_url,
            city: city,
        })
        .then(data => {
            res.status(200).json({ message: 'Service provider registered successfully', provider: data[0] });
        })
        .catch(error => {
            console.error('Error registering service provider:', error);
            res.status(500).json({ error: 'Failed to register service provider' });
        });
};

module.exports = {
    handleJoinusServiceProvider: handleJoinusServiceProvider
};
