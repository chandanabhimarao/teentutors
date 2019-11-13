import {Meteor} from 'meteor/meteor';

Students = new Mongo.Collection('students');

Students.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Students.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

/*let StudentsSchema = new SimpleSchema({
  'firstName': {
    type: String,
    label: 'The first name of this student'
  },
  'lastName': {
    type: String,
    label: 'The last name of this student'
  },
  'dateOfBirth': {
    type: Date,
    label: 'The date of birth of this student'
  },
  'educationLevel': {
    type: String,
    label: 'The level of education of this student'
  },
  'Country': {
    type: 'String',
    label: 'Country of residence'
  },
  'userId': {
    type: String,
    label: 'Corresponding user id in Meteor.users'
  },

});

Students.attachSchema( StudentsSchema );*/
