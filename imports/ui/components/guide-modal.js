import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './guide-modal.html';

Template.guideModal.helpers({
  user () {
    let userId = Meteor.userId();
    return Members.findOne({userId: userId});
  }
});
