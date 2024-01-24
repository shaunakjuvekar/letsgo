'use strict';
import Report from '../models/report.model.js';

export function findAll(req, res) {
    Report.findAll(function (err, reports) {
        if (err)
            res.send(err);
        res.send(reports);
    });
}

export function create(req, res) {
    // Extract userId from req.session
    const userId = req.session.userId;
    if (!userId) {
        // If userId is not found in the session, return an error
        res.status(401).json({ error: true, message: 'User not authenticated' });
        return;
    }

    const new_report = new Report(
        {
            ...req.body,
            reporter_id: userId,
        }
    );

    console.log(new_report)

    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Report.create(new_report, function (err, reportId) {
            if (err)
                res.send(err);
            else {
                res.json({ error: false, message: "Report created successfully!", data: { reportId } });
            }
        });
    }
}


