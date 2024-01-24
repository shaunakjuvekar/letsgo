import Search from '../models/search.model.js';

export const searchAll = (req, res) => {
    const query = req.query.q;
    console.log('Search Query:', query);

    Search.searchDestinations(query, (errDest, destinations) => {
        if (errDest) {
            return res.status(500).json({ error: 'An error occurred while searching destinations.' });
        }

        Search.searchGroups(query, (errGroup, groups) => {
            if (errGroup) {
                return res.status(500).json({ error: 'An error occurred while searching groups.' });
            }

            Search.searchUsers(query, (errUser, users) => {
                if (errUser) {
                    return res.status(500).json({ error: 'An error occurred while searching users.' });
                }

                res.json({
                    destinations: destinations.data,
                    groups: groups.data,
                    users: users.data
                });
            });
        });
    });
};

export const searchDestinations = (req, res) => {
    let query = ""
    Search.searchDestinations(query, (err, destinations) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while searching destinations.' });
        }
        res.json(destinations.data);
    });
};

export const searchGroups = (req, res) => {
    let query = ""
    Search.searchGroups(query, (err, groups) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while searching groups.' });
        }
        res.json(groups.data);
    });
};

export const searchUsers = (req, res) => {
    let query = ""
    Search.searchUsers(query, (err, users) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while searching users.' });
        }
        res.json(users.data);
    });
};
