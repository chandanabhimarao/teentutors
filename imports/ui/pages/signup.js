import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './signup.html';

Template.signup.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.signup.events({
  'change .show-tutor input'(event, instance) {
    instance.state.set('showTutor', event.target.checked);
  },
  'submit form'(event) {
    event.preventDefault();
    const firstName = event.target.first_name.value.substr(0,1).toUpperCase() + event.target.first_name.value.substr(1).toLowerCase();
    const lastName = event.target.last_name.value.substr(0,1).toUpperCase() + event.target.last_name.value.substr(1).toLowerCase();
    const email = event.target.email_address.value;
    const school = event.target.school.value;
    const dob = event.target.datepicker.value;
    const educationLevel = event.target.education_level.value;
    const password = event.target.password.value;
    const tutor = event.target.tutorcheck.checked;
    const confirmpassword = event.target.confirmpassword.value;


  if (tutor === true) {
      var nhsCodeReg = event.target.nhs_code.value;
      if (nhsCodeReg === "1235") {
        Accounts.createUser({
            email: email,
            password: password,
        }, function(error) {
            if (error) {
                Bert.alert(error.reason, 'danger');
            }
            else {
              Meteor.call('sendVerificationLink', (error, response ) => {
                if (error) {
                  Bert.alert(error.reason, 'danger');
                }
              });
             Meteor.call('createProfile', firstName, lastName, dob, educationLevel, tutor, school, (error, response) => {
                if (error) {
                  Bert.alert(error.reason, 'danger');
                }
              });
              FlowRouter.go('/');
            }
        });
      }
      else {
        Bert.alert('Wrong Code!', 'danger');
      }
    }
    else if (confirmpassword !== password) {
      Bert.alert('Passwords do not match!', 'danger');
    }
    else if (password.length <= 6) {
      Bert.alert('Password is too short! Must be more than six characters', 'danger')
    }
    else {
      Accounts.createUser({
          email: email,
          password: password,
      }, function(error) {
          if (error) {
              Bert.alert(error.reason, 'danger');
          }
          else {
            Meteor.call('sendVerificationLink', (error, response ) => {
              if (error) {
                Bert.alert(error.reason, 'danger');
              }
            });
           Meteor.call('createProfile', firstName, lastName, dob, educationLevel, tutor, school, (error, response) => {
              if (error) {
                Bert.alert(error.reason, 'danger');
              }
            });
            FlowRouter.go('/');
          }
      });
    }
  },
});

Template.signup.helpers({
  tutors() {
    const instance = Template.instance();
    if (instance.state.get('showTutor')) {
      return 'show';
    }
    else {
      return 'hide';
    }
  },
  tutorrequired() {
    const instance = Template.instance();
    if (instance.state.get('showTutor')) {
      return 'required';
    }
  },
  wrongcode() {
    var wrongcode = Session.get('wrongcode');
    if (wrongcode === true) {
      return true;
    }
    else {
      return false;
    }
  },
  meteorerror() {
    var meteorerror = Session.get('meteorerror');
    if (meteorerror === true) {
      return true;
    }
    else {
      return false;
    }
  },
  errorreason() {
    var meteorerror = Session.get('meteorerror');
    var errorreason = Session.get('errorreason');
    if (meteorerror === true) {
      return errorreason;
    }
    else {
      return false;
    }
  },
  passworderror() {
    var passworderror = Session.get('passworderror');
    if (passworderror === true) {
      return true;
    }
    else {
      return false;
    }
  },
  passwordlengtherror() {
    var passwordlengtherror = Session.get('passwordlengtherror');
    if (passwordlengtherror === true) {
      return true;
    }
    else {
      return false;
    }
  }
});
