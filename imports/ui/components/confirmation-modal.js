import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './confirmation-modal.html';

let closeModal = () => {
  $( '#confirmation-modal' ).modal( 'hide' );
  $( '.modal-backdrop' ).fadeOut();
};


Template.confirmationModal.events({
  'click .accept-edit' () {
    Session.get(date, date);
    Session.get(enddate, enddate);
    Session.get("eventId", event._id);
    let update = {
      _id: event._id,
      start: date,
      end: enddate,
    };

    Meteor.call('editEvent', update, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
    });
  },
  'click .deny-edit' () {
    revert();
  }
});
