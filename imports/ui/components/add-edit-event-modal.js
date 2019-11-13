import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './add-edit-event-modal.html';

let closeModal = () => {
  $( '#add-edit-event-modal' ).modal( 'hide' );
  $( '.modal-backdrop' ).fadeOut();
};
Template.addEditEventModal.onCreated( () => {
  Meteor.subscribe('members');
  //template subscribing to sessions database
});
Template.addEditEventModal.helpers({
 modalType( type ) {
   let eventModal = Session.get( 'eventModal' );
   if ( eventModal ) {
     return eventModal.type === type;
   }
 },
 //setting up modal based on 'edit' or 'add'
 modalLabel() {
    let eventModal = Session.get( 'eventModal' );

    if ( eventModal ) {
      return {
        button: eventModal.type === 'edit' ? 'Edit' : 'Add', //deterimines modal label or modal button based on whether 'edit' or 'add'
        label: eventModal.type === 'edit' ? 'Edit' : 'Add an'
      };
    }
  },
  event() {
    let eventModal = Session.get( 'eventModal' );

    if ( eventModal ) {
      return eventModal.type === 'edit' ? Sessions.findOne( eventModal.event ) : {
        start: eventModal.datestart,
        end: eventModal.dateend
      };
    }
  },
  tutor() {
    var tutorId = Session.get('tutorId');
    var userId = Meteor.userId();
    let eventModal = Session.get('eventModal');
    if (tutorId === userId || eventModal.type === 'add') {
      return true;
      console.log(true);
    }
    else {
      return false;
    }
  }
});

Template.addEditEventModal.events({
  'submit form' (event, template) {

    let eventModal = Session.get( 'eventModal'), //deciding whether the user is adding or editing event
    submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent'; //setting variable submitTyoe to editEvent if editing and addEvent if addiing
    //creating event item to be placed in array on submission
    eventItem = {
      title: template.find( '[name="title"]').value,
      start: template.find( '[name="start"]' ).value,
      end: template.find( '[name="end"]' ).value,
      availability: 'Open',
      studentId: 'none',
      userId: Meteor.userId()
    };

    if (submitType === 'editEvent' ) {
      eventItem._id = eventModal.event; //setting the id of the event that is being edited or 'created' to the old id
    }
    Meteor.call( submitType, eventItem, ( error ) => { //submitType is either addEvent or editEvent based on which is which, calls method
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        Bert.alert( `Event ${ eventModal.type }ed!`, 'success' );
        closeModal(); //function to close modal defined above
      }
    });
  },
  'click .delete-event' (event, template) {
    let eventModal = Session.get( 'eventModal' );
    let studentId = Session.get('studentId');
    let availability = Session.get('availability');
    if ( confirm( 'Are you sure? This is permanent.' ) ) {
      Meteor.call( 'removeEvent', eventModal.event, studentId, availability, ( error ) => {
        if ( error ) {
          Bert.alert( error.reason, 'danger' );
        } else {
          Bert.alert( 'Event deleted!', 'success' );
          closeModal();
        }
      });
    }
  },
  'click .delete-event-student' () {
    let eventModal = Session.get( 'eventModal' );
    let tutorId = Session.get('tutorId');
    if (confirm('Are you sure? This is permanent')) {
      Meteor.call('removeStudent', eventModal.event, tutorId, (error) => {
        if (error) {
          Bert.alert( error.reason, 'danger' );
        } else {
          Bert.alert( 'Event deleted!', 'success' );
          closeModal();
        }
      });
    }
  }
});
