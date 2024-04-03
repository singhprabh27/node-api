const handleUserEvents = (req, res, db) => {
    const { userid } = req.params;
    db('events')
        .join('event_user_provider', 'events.eventid', '=', 'event_user_provider.eventid')
        .where('event_user_provider.userid', userid)
        .select('events.*', 'event_user_provider.photographer_name', 'event_user_provider.decorator_name', 'event_user_provider.caterer_name', 'event_user_provider.florist_name', 'event_user_provider.baker_name', 'event_user_provider.photographer_id', 'event_user_provider.decorator_id', 'event_user_provider.caterer_id', 'event_user_provider.florist_id', 'event_user_provider.baker_id')
        .then(events => {
            res.json(events);
        })
        .catch(error => {
            console.error('Error fetching user events:', error);
            res.status(500).json({ error: 'Failed to fetch user events' });
        });
};

module.exports = {
    handleUserEvents
};
