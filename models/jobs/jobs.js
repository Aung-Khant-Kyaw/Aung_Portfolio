/**
 * jobs.js (model)
 * @namespace Incomplete
 * @see Modules/jobs[model]
 */

/**
 * This file provides the model for the job object
 * @module jobs[model]
 * @version 1.0
 * @see mongoose
 * @todo Create job creation and viewing support
 */
const mongoose = require('mongoose');
const Students = require('../users/studentUser');

/**
 * Model to represent a job
 * @typedef {mongoose.Schema}
 * @property {String} businessID - ID of the business posting the job
 * @property {String} businessName - Business name of registered business
 * @property {String} companyIndustry - industry of registered business
 * @property {String} companySize -size of the registered business
 * @property {String} jobTitle - Title of the job
 *
 * @property {String} jobStreet - Street address of the job
 * @property {String} jobStreet2 - Street address of the job
 * @property {String} jobCity - City of the job
 * @property {String} jobState - State of the job
 * @property {String} jobZip - Zip code of the job
 *
 * @property {Date} start - Starting date of the job
 * @property {Date} end - end date of the position
 * @property {Date} deadline - Application Deadline
 *
 * @property {String} pay - Estimated pay  of pay for the job
 *
 * @property {String} location - location of job being Remote, Hybrid, On-Site
 * @property {String} type - Job type being Full-Time, Part-Time, Other
 *
 * @property {String} description - About the job or Role Description of the job
 * @property {String} skills - Skills expected for the job.
 * @property {String} firstName - First name of the point of contact for the job
 * @property {String} lastName - Last name of the point of contact for the job
 * @property {String} title - Title of the point of contact for the job
 * @property {String} email - Contact email address for the job
 *
 */
const JobSchema = new mongoose.Schema(
  {
    businessID: {
      type: String,
    },
    businessName: {
      type: String,
    },
    companyIndustry: {
      type: String,
    },
    companySize: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    jobStreet: {
      type: String,
    },
    jobStreet2: {
      type: String,
    },
    jobCity: {
      type: String,
    },
    jobState: {
      type: String,
    },
    jobZip: {
      type: String,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    location: {
      type: String,
      enum: ['', 'Remote', 'Hybrid', 'On-Site'],
    },
    type: {
      type: String,
      enum: ['', 'Full-Time', 'Part-Time', 'Other'],
    },
    deadline: {
      type: Date,
    },
    description: {
      type: String,
    },
    skills: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    title: {
      type: String,
    },
    email: {
      type: String,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['In-Review', 'Approved', 'Denied'],
      default: 'In-Review',
    },
    interns: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Students'
    }],
  },
  { timestamps: true }
);

const j4iAdmin = mongoose.connection.useDb('j4i-admin');

module.exports = j4iAdmin.model('job-postings', JobSchema);
