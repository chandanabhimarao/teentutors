import {FlowRouter} from 'meteor/kadira:flow-router';

import { Template } from 'meteor/templating';

import { Tracker } from 'meteor/tracker';

import '../../ui/layouts/main-layout.html';

import '../../ui/pages/homepage.html';

import '../../ui/pages/signup.html';

import '../../ui/pages/login.html';

import '../../ui/pages/profile.html';

import '../../ui/components/add-edit-event-modal.html';

Tracker.autorun(function() {
    FlowRouter.watchPathChange();
    var context = FlowRouter.current();
    // use context to access the URL state
});


FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "homepage"});
  }
});

FlowRouter.route('/signup', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "signup"});
  }
});

FlowRouter.route('/login', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "login"});
  }
});

FlowRouter.route('/profile', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "profile"});
  }
});

FlowRouter.route('/tutorprofile/:id', {
  name: 'tutorprofile',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "otherprofile"});
  }
});

FlowRouter.route('/tutors', {

  action: function() {
    BlazeLayout.render("mainLayout", {content: "tutors"});

  }
});

FlowRouter.route('/contact', {

  action: function() {
    BlazeLayout.render("mainLayout", {content: "contactPage"});

  }
});


FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {
    Accounts.verifyEmail( params.token, ( error ) =>{
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        FlowRouter.go( '/' );
        Bert.alert( 'Email verified! Thanks!', 'success' );
        var userId = Meteor.userId();
        console.log(userId);
        Meteor.call('addVerifiedCollection', userId);
        Meteor.call('verifyMemberEmail', userId);
      }
    });
  }
});
