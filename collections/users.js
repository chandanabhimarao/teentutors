import { Meteor } from 'meteor/meteor';


Members = new Mongo.Collection('members');

if (Meteor.isServer) {
  Members._ensureIndex( { Country: 1, Algebra1: 1, Algebra2: 1} );
}

Members.allow({
  insert: (userId, doc) => {
    return !! userId;
  },
  update: (userId, doc) => {
    return !! userId;
  },
  remove: (userID, doc) => {
    return doc.userId === Meteor.userId();
  }
});

/*Members.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
*/
let MembersSchema = new SimpleSchema({
  'firstName': {
    type: String,
    label: 'The first name of this member'
  },
  'lastName': {
    type: String,
    label: 'The last name of this member'
  },
  'dateOfBirth': {
    type: Date,
    label: 'The date of birth of this member'
  },
  'educationLevel': {
    type: String,
    label: 'Education Level'
  },
  'tutor': {
    type: Boolean,
    label: 'Whether this member is a tutor or not'
  },
/*  'Algebra1': {
    type: Boolean,
    label: 'Algebra 1'
  },
  'Algebra2': {
    type: Boolean,
    label: 'Algebra 2'
  }, **/
  'subjects' : {
    type: [String],
    label: 'Subjects'
  },
  'Country': {
    type: String,
    label: 'Country of Residence'
  },
  'userId': {
    type: String,
    label: 'Corresponding user id in Meteor.users'
  },
  'emailVerified': {
    type: Boolean,
    label: "Whether or not their email has been verified"
  },
  'school' : {
    type: String,
    label: "School they attend/attended"
  }

});

Members.attachSchema( MembersSchema );
