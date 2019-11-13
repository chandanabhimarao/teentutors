import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
  //sends email after signing up to verify email address
  sendVerificationLink() {
    let userId = Meteor.userId();
    if ( userId ) {
      return Accounts.sendVerificationEmail(userId);
    }
  },
  createProfile(firstName, lastName, dob, educationLevel, tutor, school) {
    let userId = Meteor.userId();
    console.log(userId);
    Members.insert({firstName: firstName, lastName: lastName, dateOfBirth: dob, educationLevel: educationLevel, tutor: tutor, subjects: [], Country: 'United States', userId: userId, emailVerified: false, school: school});
  }
});

    /*  Accounts.onCreateUser(function(options, user) {
        //creates fields in profile in user document: firstName, lastName, dateofBirth, educationLevel, or whether or not they are a tutor
        user.profile = options.profile || {};
        user.profile.firstName = options.firstName;
        user.profile.lastName = options.lastName;
        user.profile.dateOfBirth = options.dateOfBirth;
        user.profile.educationLevel = options.educationLevel;
        user.profile.tutor = options.tutor;
        // Returns the user object
        return user;
      });*/

Accounts.emailTemplates.siteName = "Teen Tutors";
Accounts.emailTemplates.from = "Teen Tutors <first.last@gmail.com>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[Teen Tutors] Verify Your Email Address";
  },
  text (user, url) {
    let emailAddress = user.emails[0].address,
    urlWithoutHash = url.replace ('#/', ''),
    supportEmail = "support@teentutors.com",
    emailBody = 'Hi, To verify your email address ' + emailAddress + ' visit the following link:\n\n ' + urlWithoutHash + '\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ' + supportEmail;

    return emailBody;
  }
}
