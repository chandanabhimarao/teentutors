import { Meteor } from 'meteor/meteor';
//creating Session database
Sessions = new Mongo.Collection( 'sessions' );
//block database operations from client
Sessions.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Sessions.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
//controlling the way data is entered into Sessions
let SessionsSchema = new SimpleSchema({
  'title': {
    type: String,
    label: 'The title of this session.'
  },
  'start': {
    type: String,
    label: 'When this session will start.'
  },
  'end': {
    type: String,
    label: 'When this session will end.'
  },
  'availability': {
    type: String,
    label: 'Availability of Session',
    allowedValues: ['Open', 'Requested', 'Taken']
  },
  'studentId' : {
    type: String,
    label: 'userId of student'
  },
  'userId' : {
    type: String,
    label: 'The specific user the sessions are attatched to'
  }
});

Sessions.attachSchema( SessionsSchema );
