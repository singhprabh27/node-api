const handleCreateEvent = async ({ body }, res, db) => {
    const {
        eventname, eventtype, eventdate, totalguests, location,
        userid, photographer, decorator, caterer, florist, baker
    } = body;
    const { cuisinepreferences, decorationtheme, entertainmentpreferences } = body;
    // Input validation
    if (!eventname || !eventtype || !eventdate || !totalguests || !location || !userid) {
        return res.status(400).json('Missing required fields');
    }

    try {
        const getServiceIdAndName = async (serviceType, city) => {
            const serviceProvider = await db.select('serviceproviderid', 'name')
                .from('serviceproviders')
                .where('servicetype', '=', serviceType)
                .andWhere('city', '=', city)
                .first();

            if (!serviceProvider) {
                console.log(`Service provider not found for ${serviceType} in ${city}`);
                return null;
            }
            return serviceProvider;
        };

        // Insert event into the events table
        const [event] = await db('events').insert({
            userid, eventname, eventtype, location, eventdate, totalguests, cuisinepreferences, decorationtheme, entertainmentpreferences
        }).returning('*');

        // Get eventid from the inserted event
        const eventid = event.eventid;

        // Resolve service provider IDs and names
        const photographerData = photographer === 'false' ? null : await getServiceIdAndName('photographer', location);
        const decoratorData = decorator === 'false' ? null : await getServiceIdAndName('decorator', location);
        const catererData = caterer === 'false' ? null : await getServiceIdAndName('caterer', location);
        const floristData = florist === 'false' ? null : await getServiceIdAndName('florist', location);
        const bakerData = baker === 'false' ? null : await getServiceIdAndName('baker', location);

        // Insert event user provider into the event_user_provider table
        const [user] = await db('event_user_provider').insert({
            eventid, userid,
            photographer_id: photographerData ? photographerData.serviceproviderid : null,
            photographer_name: photographerData ? photographerData.name : null,
            decorator_id: decoratorData ? decoratorData.serviceproviderid : null,
            decorator_name: decoratorData ? decoratorData.name : null,
            caterer_id: catererData ? catererData.serviceproviderid : null,
            caterer_name: catererData ? catererData.name : null,
            florist_id: floristData ? floristData.serviceproviderid : null,
            florist_name: floristData ? floristData.name : null,
            baker_id: bakerData ? bakerData.serviceproviderid : null,
            baker_name: bakerData ? bakerData.name : null
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
