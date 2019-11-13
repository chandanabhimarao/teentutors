import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';

import './otherprofile.html';

Template.otherprofile.onCreated(() => {
    Meteor.subscribe('alltutors');
    let template = Template.instance();
    template.subscribe('sessions');
});

Template.otherprofile.onRendered( () => {
  $('.events-calendar').fullCalendar({
    defaultView: 'agendaWeek',
    events( start, end, timezone, callback ) { //defining events in calendar as the events in Session
      var userId = FlowRouter.getParam("id");
      let data = Sessions.find({userId: userId}).fetch().map( (event) => {//modifying events in Sessions
        event.editable = false;//modifying events in Sessions to make past events uneditable
        return event; //returning modified array

      });
      if (data) {
        callback( data );
      }
    },
    eventRender(event, element) {
      element.find('.fc-content').html(
        `<h4> ${event.title} </h4>
        <p class="availability-${event.availability}">${event.availability}</p>

        `
      );
    },
    eventClick(event) {
      var userId = Meteor.userId();
      var sessions = Sessions.find({studentId: userId}, {fields: {end: 1, start: 1, _id: 0}}).fetch();
      timeTakenEnd(event.start, event.end);
      if (isPast(event.start.format())) {

          Bert.alert("Sessions in the past cannot be requested", "danger");
      }
      else if (timeTakenStart(event.start, event.end) || timeTakenEnd(event.start, event.end)) {
        Bert.alert("You already have a session during this time", "danger");
      }
      else {
        console.log('Request Session');
        Session.set('sessionId', event._id);
        Session.set('tutorId', event.userId);
        Session.set('eventTitle', event.title);
        console.log(event._id);
        $('#request-session-modal').modal('show');
      }
    }

  });
  Tracker.autorun( () => {
   Sessions.find().fetch();
   $( '.events-calendar' ).fullCalendar( 'refetchEvents' );
 });
});

let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};

let timeTakenStart = (clickStart, clickEnd) => {
  var userId = Meteor.userId();
  var sessions = Sessions.find({$or: [{studentId: userId}, {userId: userId}]}, {fields: {end: 1, start: 1, _id: 0}}).fetch();


  let ifStartTaken = []
  for (i=0; i<sessions.length; i++) {

    var allStarts = sessions[i].start;
    var startTaken = moment(allStarts).isBetween(clickStart.format(), clickEnd.format(), null, []);
    ifStartTaken.push(startTaken);
    if (i=== sessions.length-1) {

      if (ifStartTaken.indexOf(true) === -1 ) {

        return false;
      }
      else {

        return true;
      }
    }
  }
};

let timeTakenEnd = (clickStart, clickEnd) => {
  var userId = Meteor.userId();
  var sessions = Sessions.find({$or: [{studentId: userId}, {userId: userId}]}, {fields: {end: 1, start: 1, _id: 0}}).fetch();


  let ifEndTaken = []
  for (i=0; i<sessions.length; i++) {

    var allEnds = sessions[i].end;
    var endTaken = moment(allEnds).isBetween(clickStart.format(), clickEnd.format(), null, []);
    ifEndTaken.push(endTaken);
    if (i=== sessions.length-1) {

      if (ifEndTaken.indexOf(true) === -1 ) {

        return false;
      }
      else {

        return true;
      }
    }
  }
}

Template.otherprofile.helpers({
  user() {
    var userId = FlowRouter.getParam("id");
    return Tutors.findOne({userId: userId});
  }
});
