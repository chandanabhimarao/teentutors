import { Meteor } from 'meteor/meteor';

import '../imports/api/signup.js';

import '../imports/api/subscriptions.js';

import '../imports/startup/server/mail-url.js';

import '../imports/api/methods.js';

import '../imports/api/publications.js';

import '../imports/startup/server/index.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.settings.contactForm = {
  emailTo: 'first.last@gmail.com'
};
