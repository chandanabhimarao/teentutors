import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';
import {FlowRouter} from 'meteor/kadira:flow-router';
import './tutors.html';
import './loading.html';


Template.tutors.onCreated( () => {
  let template = Template.instance();
  //creates two template variables, the search input and the searching state
  Meteor.subscribe('members');
//  template.searchQueryCountry = new ReactiveVar();
 template.searchQuerySubject = new ReactiveVar();
//  template.searchQuerySchool = new ReactiveVar();
  template.searching = new ReactiveVar( false );

  template.autorun( () => {
    template.subscribe('tutors', template.searchQuerySubject.get(), () => {
      setTimeout( () => {
        template.searching.set( false );
      }, 300 );
    });
  });


});


Template.tutors.helpers({
  searching() {
    return Template.instance().searching.get(); //retreives template instance whether searching or not
  },
  subjectquery() {
    return Template.instance().searchQuerySubject.get();
  },
  tutors() {
    //automatically returns the selected tutors we want b/c of subscription
    let tutors = Tutors.find(); //MODIFY TO TUTORS LATER

    if (tutors) {
      return tutors;
    }
  },
  user() {
  let userId = Meteor.userId();
  return Members.findOne({userId: userId});
},
  isSame(userId) {
    let currentUser = Meteor.userId();
    if (userId === currentUser) {
      return true;
      console.log(true);
    }
    else {
      return false;
    }
  }
});

Template.tutors.events({
  'submit form' (event, template) {

    event.preventDefault();

    let subjectvalue = event.target.subject.value.trim();

    if (subjectvalue !== '') {
      template.searchQuerySubject.set( subjectvalue );
      template.searching.set( true );
    }

    if (subjectvalue === '') {
      template.searchQuerySubject.set( subjectvalue );
    }
  },
  'click .tutorslist' (event) {
    console.log('Link tutors');
    console.log(event.currentTarget.id);
    var tutorId = event.currentTarget.id;
    FlowRouter.go("tutorprofile", {id: tutorId});
  }
});
