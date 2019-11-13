import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
//publishing Sessions data for calendar



Meteor.methods({
  addEvent( event ) {
    check( event, {
      title: String,
      start: String,
      end: String,
      availability: String,
      studentId: String,
      userId: String
    });

    try {
      return Sessions.insert( event ); //try this, if it does not work, run catch block
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },
  editEvent( event ) {
   check( event, {
     _id: String,
     title: Match.Optional( String ),
     start: String,
     end: String,
     availability: Match.Optional(String),
     studentId: Match.Optional(String),
     userId: Match.Optional( String )
   });

   try {
     return Sessions.update( event._id, {
       $set: event
     });
   } catch ( exception ) {
     throw new Meteor.Error( '500', `${ exception }` );
   }
 },
 removeEvent(event, studentId, availability) {
    check( event, String );
    try {
      if (availability !== "Open") {
        console.log("Remove Session w/ Student");
        var student = Meteor.users.findOne({_id: studentId});
        console.log(studentId);
        var to = student.emails[0].address;
        var from = 'first.last@gmail.com'
        var subject = "Session Deleted"
        var text = "Your session " + event.title + " has been deleted by your tutor"
        Email.send({to, from, subject, text});
        Sessions.remove( event );
      }
      else {
        Sessions.remove( event );
      }
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },
  removeStudent(event, tutorId) {
    var tutor = Meteor.users.findOne({_id: tutorId});
    var to = tutor.emails[0].address;

    var from = 'first.last@gmail.com'
    var subject = "Student Withdrawn from Session"
    var text = "A student has withdrawn themselves from the session "+ event.title + " This session is available once again and is no longer occupied by a student."
    Email.send({to, from, subject, text});
    Sessions.update({_id: event}, {$set: {studentId: "none", availability: "Open"}});
  },
  requestSession( sessionId ) {
    var currentUser = Meteor.userId();
    Sessions.update({_id: sessionId}, {$set: {studentId: currentUser, availability: 'Requested'}})
  },
  acceptSession(sessionId) {
    Sessions.update({_id: sessionId}, {$set: {availability: 'Taken'}});
  },
  denySession(sessionId) {
    Sessions.update({_id: sessionId}, {$set: {availability: 'Open', studentId: 'none'}})
  },
  recieveTutor(userId) {
    var member = Members.findOne({userId: userId}, {fields: {tutor: 1, _id: 0}});
    var tutor = member.tutor;

    return tutor;
  },
  verifyMemberEmail(userId) {
    Members.update({userId: userId}, {$set: {emailVerified: true}});
  },
  sendRequestEmail(tutorId, eventTitle) {
    var tutor = Meteor.users.findOne({_id: tutorId});
    var to = tutor.emails[0].address;

    var from = 'first.last@gmail.com'
    var subject = 'Your Session ' + eventTitle + ' is Requested'
    var text = 'Your session ' + eventTitle + ' has been requested. Please log into your Teen Tutors account to accept or deny this request.'
    Email.send({to, from, subject, text});
  },
  sendAcceptDenyEmail(studentId, eventTitle, response) {
    var student = Meteor.users.findOne({_id: studentId});
    var to = student.emails[0].address;
    var from = 'first.last@gmail.com'
    if (response === true) {
      var subject = 'Your Session ' + eventTitle + ' has been Confirmed'
      var text = "The session you have requested " + eventTitle + 'has been confirmed by your tutor. Please log into your account at the time of your session and click on the calendar event to access it.'
      Email.send({to, from, subject, text});
    }
    else {
      var subject = 'Your Session ' + eventTitle + 'has been Denied'
      var text = "The session you have requested " + eventTitle + "has been denied by the tutor. Please log into your account to request another session"
      Email.send({to, from, subject, text});
    }
  },
  addVerifiedCollection(userId) {
    var member = Members.findOne({userId: userId}, {fields: {tutor: 1, _id: 0}});
    var tutor = member.tutor;

  if (tutor == true) {
    var currentUser =  Members.findOne({userId: userId}, {fields: {firstName: 1, lastName: 1, dateOfBirth: 1, educationLevel: 1, Algebra1: 1, Algebra2: 1, Country: 1, userId: 1, school: 1}})

    Tutors.insert(currentUser);
  }
  else {
    var currentUser = Members.findOne({userId: userId}, {fields: {firstName: 1, lastName: 1, dateOfBirth: 1, educationLevel: 1, Country: 1, userId: 1, school: 1}})

    Students.insert(currentUser);
  }
  },
  updateProfile() {
  var userId = Meteor.userId();
  var member =  Members.findOne({userId: userId}, {fields: {educationLevel: 1, Country: 1, school: 1, subjects: 1, tutor: 1,_id: 0}});
  var educationLevel = member.educationLevel;

  var Algebra1 = member.Algebra1;

  var Algebra2 = member.Algebra2;

  var Country = member.Country;


  var tutor = member.tutor;
  var school = member.school;
  var subjects = member.subjects;

    if (tutor === true) {
      Tutors.update({userId: userId}, {$set: {educationLevel: educationLevel, Country: Country, subjects: subjects, school: school}})
    }
    else {
      Students.update({userId: userId}, {$set: {educationLevel: educationLevel, Country: Country, subjects: subjects, school: school}})
    }
  }
/*  profileUpdate(oneAlgebra, twoAlgebra) {
    var userId = Meteor.userId();
    Members.update({userId: Meteor.userId()}, {$set: {Algebra1: oneAlgebra, Algebra2: twoAlgebra}})
    var member = Members.findOne({userId: userId}, {fields: {tutor: 1, _id: 0}});
    var tutor = member.tutor;
    if (tutor === true) {
      Tutors.update({userId: Meteor.userId()}, {$set: {Algebra1: oneAlgebra, Algebra2: twoAlgebra}})
    }
    else {
      Students.update({userId: Meteor.userId()}, {$set: {Algebra1: oneAlgebra, Algebra2: twoAlgebra}})
    }

  }*/

/*  addAlgebra1() {
    Members.update({userId: Meteor.userId()}, {$set: {Algebra1: true}});
  },
  removeAlgebra1() {
    Members.update({userId: Meteor.userId()}, {$set: {Algebra1: false}});
  },
  addAlgebra2() {
    Members.update({userId: Meteor.userId()}, {$set: {Algebra2: true}});
  },
  removeAlgebra2() {
    Members.update({userId: Meteor.userId()}, {$set: {Algebra2: false}});
  },
  addCountry(country) {
    Members.update({userId: Meteor.userId()}, {$set: {Country: country}});
  }
  */
});
