import { Meteor } from 'meteor/meteor';

Meteor.publish('tutors', function (searchSubject) {

  check(searchSubject, Match.OneOf( String, null, undefined));

  // check if search input is one of String, null, or undefined
  let query = {},
      projection = { limit: 10, sort: {firstName: 1}};
    if ( searchSubject ) {

      let regexSubject = new RegExp(searchSubject, 'i');
      query = {
        $or : [
            {subjects: regexSubject},
        ]
      }
      projection.limit = 100;
    }
/*  if ( searchCountry && searchSubject ) {
    let regexCountry = new RegExp( searchCountry, 'i');
    if (searchSubject === 'Algebra 1') {
      query = {

          $or: [
            { Country: regexCountry },
            { Algebra1: true}
          ]

         };
    }
    else if (searchSubject === 'Algebra 2') {
      query = {
          $or: [
            { Country: regexCountry },
            { Algebra2: true}
          ]

         };
    }
    else {
      query = {
        $or: [
          { Country: regexCountry }
        ]
      }
    }

    projection.limit = 100;
  } */



  return Tutors.find(query, projection);
});

Meteor.publish('members', function() {
    return Members.find();
})
Meteor.publish('alltutors', function () {
  return Tutors.find();
});
Meteor.publish( 'sessions', function() {
  return Sessions.find();
});
