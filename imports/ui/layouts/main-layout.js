import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './main-layout.html';

Template.mainLayout.events({
  'click #logout' () {
    Meteor.logout(function() {
      FlowRouter.go('/');
    });
  },
  'click .guide' () {
    $('#guide-modal').modal('show');
  }
});

Template.mainLayout.helpers({
  pathForSignup: function() {
    var path = FlowRouter.path('/signup');
    return path;
  },
  pathForLogin: function() {
    var path = FlowRouter.path('/login');
    return path;
  },
  pathForProfile: function() {
    var path = FlowRouter.path('/profile');
    return path;
  },
  pathForTutors: function() {
    var path = FlowRouter.path('/tutors');
    return path;
  },
  pathForContact: function() {
    var path = FlowRouter.path('/contact');
    return path;
  },
  pathForHomepage: function() {
    var path = FlowRouter.path('/');
    return path;
  }

});
