const handleCreateEvent = (req, res, db) => {

    const { eventname, eventtype, eventdate, totalguests, location, cuisinepreferences, decorationtheme, entertainmentpreferences, userid, photographer, decorator, caterer,
        florist,
        baker } = req.body;
    console.log(eventname, eventtype, eventdate, totalguests, location, cuisinepreferences, decorationtheme, entertainmentpreferences, userid, photographer, decorator, caterer, florist, baker);

    const getServiceId = (serviceType, city) => {
        let serviceproviderid = null;
        return db.select('serviceproviderid')
            .from('serviceproviders')
            .where('servicetype', '=', serviceType)
            .andWhere('city', '=', city)
            .first()
            .then(serviceProvider => {
                if (!serviceProvider) {
                    console.log('service provider not found');
                    console.log(serviceType, city);
                }
                else {
                    return serviceProvider.serviceproviderid;
                }
                return serviceproviderid;

            });
    };

    let photographerPromise = null;
    let decoratorPromise = null;
    let catererPromise = null;
    let floristPromise = null;
    let bakerPromise = null;



    if (photographer === 'false') {
        photographerPromise = null;
    }
    else {
        photographerPromise = getServiceId('photographer', location);
        console.log(photographerPromise);
    }
    if (decorator === 'false') {
        decoratorPromise = null;
    }
    else {
        decoratorPromise = getServiceId('decorator', location);
        console.log(decoratorPromise);
    }
    if (caterer === 'false') {
        catererPromise = null;
    }
    else {
        catererPromise = getServiceId('caterer', location);
        console.log(catererPromise);
    }
    if (florist === 'false') {
        floristPromise = null;
    }
    else {
        floristPromise = getServiceId('florist', location);
        console.log(floristPromise);
    }
    if (baker === 'false') {
        bakerPromise = null;
    }
    else {
        bakerPromise = getServiceId('baker', location);
        console.log(bakerPromise);
    }

    db.transaction(trx => {
        Promise.all([
            photographerPromise,
            decoratorPromise,
            catererPromise,
            floristPromise,
            bakerPromise,
        ])
            .then(([photographerId, decoratorId, catererId, floristId, bakerId]) => {
                // Insert into the events table
                return trx.insert({
                    userid: userid,
                    eventname: eventname,
                    eventtype: eventtype,
                    location: location,
                    eventdate: eventdate,
                    totalguests: totalguests,
                    cuisinepreferences: cuisinepreferences,
                    decorationtheme: decorationtheme,
                    entertainmentpreferences: entertainmentpreferences,

                })
                    .into('events')
                    .returning('eventid')
                    .then(Event => {
                        // Insert into the event_user_provider table
                        return trx('event_user_provider')
                            .returning('*')
                            .insert({
                                eventid: Event[0].eventid,
                                userid: userid,
                                photographer: photographerId,
                                decorator: decoratorId,
                                caterer: catererId,
                                florist: floristId,
                                baker: bakerId,
                            })
                            .then(user => {
                                console.log(user[0]);
                                console.log(photographerId);
                                console.log(decoratorId);
                                console.log(catererId);
                                console.log(floristId);
                                console.log(bakerId);
                                res.json(user[0]);
                            })
                            .catch(err => res.status(400).json('Unable to join'));
                    });
            })
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .catch(err => {
            res.status(500).json('Error creating event: ' + err.message);
        });
}

module.exports = {
    handleCreateEvent: handleCreateEvent
};
