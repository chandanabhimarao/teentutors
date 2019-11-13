import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './login.html';

Template.login.events({
  'submit form'(event) {
          event.preventDefault();
          var email = event.target.email_login.value;
          var password = event.target.password_login.value;
          console.log("Form submitted.");
          Meteor.loginWithPassword(email, password, function(err){
            if (err) {
                Bert.alert( err.reason, 'danger' );
            }
            else {
                FlowRouter.go('/');
            }
          });
      }
});
