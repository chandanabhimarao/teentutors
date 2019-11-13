import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './add-edit-profile.html';

Template.addEditProfile.onCreated(function bodyOnCreated() {
//  this.state = new ReactiveDict();
  Meteor.subscribe('members');
});
Template.addEditProfile.events({
  'submit form' (event) {
    event.preventDefault();
    console.log('form submitted');
      $( '#add-edit-profile-modal' ).modal( 'hide' );
      Meteor.call('updateProfile');
  }
});
/*
Template.addEditProfile.events({
  'click .algebra1' (event) {
    var oneAlgebra = $(event.target).is(".checked")
    console.log("algebra1")
    var isChecked = event.target.checked;
    Session.set ('oneAlgebra', isChecked);
  },
  'click .algebra2' (event) {
    console.log("algebra2");
    var isChecked = event.target.checked;
    Session.set('twoAlgebra', isChecked);
  },
  'submit form' (event) {
    event.preventDefault();
    var userId = Meteor.userId();
    var member = Members.findOne({userId: userId}, {fields: {Algebra1: 1, Algebra2: 1, _id: 0}});
    console.log(member.Algebra1);
    var sessionone = Session.get('oneAlgebra');
    var sessiontwo = Session.get('twoAlgebra');
    if (sessionone) {
      var oneAlgebra = Session.get('oneAlgebra');
    }
    else {
      var oneAlgebra = member.Algebra1;
    }

    if (sessiontwo) {
      var twoAlgebra = Session.get('twoAlgebra')
    }
    else {
      var twoAlgebra = member.Algebra1;
    }
    Meteor.call('profileUpdate', oneAlgebra, twoAlgebra);


   const instance = Template.instance();
    let algebra1 = instance.state.get('algebra1');
    let algebra2 = instance.state.get('algebra2');
    let country = $('#countries').val();
    console.log(country);
    if (algebra1) {
      Meteor.call('addAlgebra1');
    }
    else {
      Meteor.call('removeAlgebra1');
    }
    if (algebra2) {
      Meteor.call('addAlgebra2');
    }
    else {
      Meteor.call('removeAlgebra2');
    }
    if (country) {
      Meteor.call('addCountry', country);
    }
      $( '#add-edit-profile-modal' ).modal( 'hide' );
  },
}); */

Template.addEditProfile.helpers({
  user() {
    let userId = Meteor.userId();
    return Members.findOne({userId: userId});
  },
/*tutoringSubject(options) {
  if(options.hash.subject) {
    return 'checked';
  }
},
 unitedstates(options) {
   if (options.hash.country === 'United States') {
     return "selected"
   }

 },
 india (options){
   if (options.hash.country === 'India') {
     return "selected"
   }
 }*/
});
