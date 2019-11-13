import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './accept-deny-modal.html';

let closeModal = () => {
  $( '#request-session-modal' ).modal( 'hide' );
  $( '.modal-backdrop' ).fadeOut();
};

Template.acceptDenyModal.onCreated( () => {
  Meteor.subscribe('members');
});

Template.acceptDenyModal.helpers({
  student() {
    var studentId = Session.get('studentId');
    var student = Members.findOne({userId: studentId});
    return student;
  }
});

Template.acceptDenyModal.events({
  'click .accept-session' () {
    var sessionId = Session.get('sessionId');
    console.log(sessionId);
    Meteor.call('acceptSession', sessionId);
    var studentId = Session.get('studentId');
    var eventTitle = Session.get('eventTitle');
    Meteor.call('sendAcceptDenyEmail', studentId, eventTitle, true);
    closeModal();

  },
  'click .deny-session' ()  {
    var sessionId = Session.get('sessionId');
    Meteor.call('denySession', sessionId);
    var studentId = Session.get('studentId');
    var eventTitle = Session.get('eventTitle');
    Meteor.call('sendAcceptDenyEmail', studentId, eventTitle, false);
    closeModal();
  }
});
