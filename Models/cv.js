const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// cv schema
const cvSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    PersonalInfor: {
        fullName: String,
        dob: String,
        status: String,
        address: String,
        mobile: String,
        email: String,
        nationality: String,
        pic: String
    },
    EducationInfor: {
        name_of_Institution: String,
        start_duration: String,
        end_duration: String,
        qualification: String
    },
    WorkInfor: {
        name_of_workPlace: String,
        work_start: String,
        work_end: String,
        position_held: String,
        responsibilities: String
    },
    Attributes: {
        languages: String,
        interests: String
    },
    Referee: {
        title: String,
        name_of_referee: String,
        ref_address: String,
        ref_email: String,
        contact_num: String
    },
    created_at: {
        type: String,
        default: Date.now
    }
});

// enable the user to be used in external functions
const CV = module.exports = mongoose.model('CV', cvSchema);

// Get CVs
module.exports.getCVs = (callback, limit) => {
    CV.find(callback).limit(limit).sort([['created_at', 'ascending']]);
};

// Get CV by the id
module.exports.getCVById = (id, callback) => {
    CV.findById(id, callback);
};

// Get user's CV
module.exports.getCVByUserId = (user_id, callback) => {
    const query = {user: user_id};
    CV.findOne(query, callback).sort([['created_at', 'ascending']]);
};


// Add CV
module.exports.addCV = (cv, callback) => {
    const add = {
        user: cv.user,
        PersonalInfor: {
            fullName: cv.fullName,
            dob: cv.dob,
            status: cv.status,
            address: cv.address,
            mobile: cv.mobile,
            email: cv.email,
            nationality: cv.nationality,
            pic: cv.pic
        },
        EducationInfor: {
            name_of_Institution: cv.name_of_Institution,
            start_duration: cv.start_duration,
            end_duration: cv.end_duration,
            qualification: cv. qualification
        },
        WorkInfor: {
            name_of_workPlace: cv.name_of_WorkPlace,
            work_start: cv.work_start,
            work_end: cv.work_end,
            position_held: cv. position_held,
            responsibilities: cv.responsibilities
        },
        Attributes: {
            languages: cv.languages,
            interests: cv.interests
        },
        Referee: {
            title:cv.title,
            name_of_referee: cv.name_of_referee,
            ref_address: cv.ref_address,
            ref_email: cv.ref_email,
            contact_num: cv.contact_num
        }
    };
    CV.create(add, callback); // saves to db
    
};

// Update CV
module.exports.updateCV = (user_id, cv, options, callback) => {
    const query = {user: user_id};  // user the user's id to update the doc
    
    const update = {
        PersonalInfor: {
            fullName: cv.fullName,
            dob: cv.dob,
            status: cv.status,
            address: cv.address,
            mobile: cv.mobile,
            email: cv.email,
            nationality: cv.nationality,
            pic: cv.pic,
        },
        EducationInfor: {
            name_of_Institution: cv.name_of_Institution,
            start_duration: cv.start_duration,
            end_duration: cv.end_duration,
            qualification: cv. qualification,
        },
        WorkInfor: {
            name_of_workPlace: cv.name_of_WorkPlace,
            work_start: cv.work_start,
            work_end: cv.work_end,
            position_held: cv. position_held,
            responsibilities: cv.responsibilities
        },
        Attributes: {
            languages: cv.languages,
            interests: cv.interests
        },
        Referee: {
            title:cv.title,
            name_of_referee: cv.name_of_referee,
            ref_address: cv.ref_address,
            ref_email: cv.ref_email,
            contact_num: cv.contact_num
        }
    };
    CV.findOneAndUpdate(query, update, options, callback);
};

// Deletes the CV
module.exports.removeCV = (user_id, callback) => {
    const query = {user: user_id};
    CV.remove(query, callback);
};
