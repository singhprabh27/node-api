const handleCreateEvent = async ({ body }, res, db) => {
    const {
        eventname, eventtype, eventdate, totalguests, location,
        userid, photographer, decorator, caterer, florist, baker
    } = body;
    const {  cuisinepreferences, decorationtheme, entertainmentpreferences} = body;
    // Input validation
    if (!eventname || !eventtype || !eventdate || !totalguests || !location || !userid) {
        return res.status(400).json('Missing required fields');
    }

    try {
        const getServiceId = async (serviceType, city) => {
            const serviceProvider = await db.select('serviceproviderid')
                .from('serviceproviders')
                .where('servicetype', '=', serviceType)
                .andWhere('city', '=', city)
                .first();

            if (!serviceProvider) {
                console.log(`Service provider not found for ${serviceType} in ${city}`);
                return null;
            }
            return serviceProvider.serviceproviderid;
        };

        // Insert event into the events table
        const [event] = await db('events').insert({
            userid, eventname, eventtype, location, eventdate, totalguests, cuisinepreferences, decorationtheme, entertainmentpreferences
        }).returning('*');

        // Get eventid from the inserted event
        const eventid = event.eventid;

        // Resolve service provider IDs
        const photographerId = photographer === 'false' ? null : await getServiceId('photographer', location);
        const decoratorId = decorator === 'false' ? null : await getServiceId('decorator', location);
        const catererId = caterer === 'false' ? null : await getServiceId('caterer', location);
        const floristId = florist === 'false' ? null : await getServiceId('florist', location);
        const bakerId = baker === 'false' ? null : await getServiceId('baker', location);

        // Insert event user provider into the event_user_provider table
        const [user] = await db('event_user_provider').insert({
            eventid, userid, photographer: photographerId, decorator: decoratorId,
            caterer: catererId, florist: floristId, baker: bakerId
        }).returning('*');

        res.json({ eventid, user });
    } catch (error) {
        console.error('Error creating event:', error.message);
        res.status(500).json('Error creating event: ' + error.message);
    }
};

module.exports = {
    handleCreateEvent
};
