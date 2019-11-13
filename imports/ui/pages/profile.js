import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import {FlowRouter} from 'meteor/kadira:flow-router';

import './profile.html';

Template.profile.onCreated( () => {
  let template = Template.instance();
  template.subscribe('sessions');
  Meteor.subscribe('members');
  //template subscribing to sessions database
});

Template.profile.onRendered( () => {
//  $('#add-edit-event-modal').modal();
  $( '.events-calendar' ).fullCalendar({
    defaultView : 'agendaWeek',
    events( start, end, timezone, callback ) { //defining events in calendar as the events in Session
      var userId = Meteor.userId();
      if (userId !== null){
        Meteor.call('recieveTutor', userId, function(error, result) {
          Session.set('currentTutor', result);
        });
      }
      var tutor = Session.get('currentTutor');
      if (tutor === true) {
        let data = Sessions.find({$or: [{userId: userId}, {studentId: userId}]}).fetch().map( (event) => {//modifying events in Sessions
          event.editable = !isPast(event.start) //modifying events in Sessions to make past events uneditable
          return event; //returning modified array

        });
        if (data) {
          callback( data );
        }
      }
      else {
        let data = Sessions.find({studentId: userId}).fetch().map( (event) => {//modifying events in Sessions//modifying events in Sessions to make past events uneditable
          return event; //returning modified array

        });
        if (data) {
          callback( data );
        }
      }
    },
    eventRender(event, element) {
      var currentUser = Meteor.userId();
      if (event.userId === currentUser) {
        element.find('.fc-content').html(
          `<h4> ${event.title} Tutor </h4>
          <p class="availability-${event.availability}">${event.availability}</p>
          `
        );
      }
      else {
        element.find('.fc-content').html(
          `
          <h4> ${event.title}  Student </h4>
          <p class="availability-${event.availability}">${event.availability}</p>
          `
        );
      }
    },
    eventDurationEditable : false,
    eventDrop (event, delta, revert) {
      let date = event.start.format();
      let enddate = event.start.add(1, 'hour').format();
      let userId = Meteor.userId();
      var member = Members.findOne({userId: userId}, {fields: {tutor: 1, _id: 0}});
      var tutor = member.tutor;
      if (!isPast(date) && event.availability==="Open") {
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
      }
      else if ((tutor === true) && event.userId !== userId ) {
        revert();
        Bert.alert("You may not edit this session.", "danger");

      }else {
        revert();
        Bert.alert('Items cannot be moved to the past. Taken or Requested Sessions may not be edited.', 'danger');
      }
    },
    dayClick( date ) {
        var userId = Meteor.userId();
        var member = Members.findOne({userId: userId}, {fields: {tutor: 1, _id: 0}});
        var tutor = member.tutor;
        if (tutor === true && !isPast(date.format())) {
          Session.set('eventModal', {type: 'add', datestart: date.format(), dateend: date.add(1, 'hour').format()});
          $('#add-edit-event-modal').modal('show');
        }
    },
    eventClick( event ) {
      var userId = Meteor.userId();
      var member = Members.findOne({userId: userId}, {fields: {tutor: 1, _id: 0}});
      var tutor = member.tutor;
      var currentTime = moment().format();
      var start = event.start.format();
      var end = event.end.format();
      if ((event.userId === userId) && event.availability === 'Requested') {
        $('#accept-deny-modal').modal('show');
        Session.set('studentId', event.studentId);
        Session.set('sessionId', event._id);
        Session.set('eventTitle', event.title);
      }
      else if (moment(currentTime).isBetween(start, end) && event.availability === 'Taken') {
      //  FlowRouter.go("session", {sessionId: event._id});
      var str1 = "https://class.teentutors.club/index.html#";
      var str2 = event._id;
      var classUrl = str1.concat(str2);
      window.open(classUrl);
      }
      else {
      Session.set('availability', event.availability);
      Session.set('eventModal', {type: 'edit', event: event._id});
      Session.set('studentId', event.studentId);
      Session.set('tutorId', event.userId)
      $('#add-edit-event-modal').modal('show');
      }
    }
  });
  Tracker.autorun( () => {
    Sessions.find().fetch();
    $( '.events-calendar' ).fullCalendar( 'refetchEvents' );
  });
});

//defining the past dates
let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};

Template.profile.helpers({
  user() {
  let userId = Meteor.userId();
  return Members.findOne({userId: userId});
  }
});

Template.profile.events({
  'click .editprofile' () {
    $('#add-edit-profile-modal').modal('show');
  }
});
