import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './homepage.html';

Template.homepage.onCreated( () => {
  Meteor.subscribe('members');
});

Template.homepage.helpers({
  user() {
  let userId = Meteor.userId();
  return Members.findOne({userId: userId});
  }
});
