import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Email } from 'meteor/email';
import './request-session-modal.html';

let closeModal = () => {
  $( '#request-session-modal' ).modal( 'hide' );
  $( '.modal-backdrop' ).fadeOut();
};

Template.requestSessionModal.onCreated( () => {
  Meteor.subscribe('sessions');
});
Template.requestSessionModal.events({
  'click .request' () {
    var sessionId = Session.get('sessionId');
    var tutorId = Session.get('tutorId');
    var eventTitle = Session.get('eventTitle');
    console.log(sessionId);
    console.log('request button clicked');
    Meteor.call('requestSession', sessionId);
    Meteor.call('sendRequestEmail', tutorId, eventTitle);
    closeModal();
  }
});

Template.requestSessionModal.helpers({
  clickedSession () {
    var sessionId = Session.get('sessionId');
    var clickedSession = Sessions.findOne({_id: sessionId});
    return clickedSession;
  },
  open (availability) {
    if (availability === 'Open') {
      return true;
    }
    else {
      return false;
    }
  }
});
