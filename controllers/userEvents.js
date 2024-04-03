const handleUserEvents = (req, res, db) => {
    const { userid } = req.params;
    db('events')
        .join('event_user_provider', 'events.eventid', '=', 'event_user_provider.eventid')
        .where('event_user_provider.userid', userid)
        .select('events.*', 'event_user_provider.photographer', 'event_user_provider.decorator', 'event_user_provider.caterer', 'event_user_provider.florist', 'event_user_provider.baker')
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
