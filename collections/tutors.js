import {Meteor} from 'meteor/meteor';

Tutors = new Mongo.Collection('tutors');

if (Meteor.isServer) {
  Tutors._ensureIndex( { Country: 1, Algebra1: 1, Algebra2: 1} );
}


Tutors.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Tutors.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
/*
let TutorsSchema = new SimpleSchema({
  'firstName' : {
    type: String,
    label: 'The first name of this tutor'
  },
  'lastName': {
    type: String,
    label: 'The last name of this tutor'
  },
  'dateOfBirth': {
    type: Date,
    label: 'The date of birth of this tutor'
  },
  'educationLevel': {
    type: String,
    label: 'The level of education of this tutor'
  },
  'Algebra1': {
    type: Boolean,
    label: 'Whether or not they are tutoring Algebra 1'
  },
  'Algebra2': {
    type: Boolean,
    label: 'Whether or not they are tutoring Algebra 2'
  },
  'Country': {
    type: 'String',
    label: 'Country of residence'
  },
  'userId': {
    type: String,
    label: 'Corresponding user id in Meteor.users'
  }
});

Tutors.attachSchema( TutorsSchema ); */
