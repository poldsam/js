// Messages = new Mongo.Collection("messages");

// if (Meteor.isClient) {
//   Template.search.events({
//     "submit #search": function (e) {
//       e.preventDefault();
//       Session.set("searchValue", $("#searchValue").val());
//     }
//   });



// Meteor.subscribe('messages');

//   Template.search.helpers({
//     messages: function() {
//       Meteor.subscribe("search", Session.get("searchValue"));
//       if (Session.get("searchValue")) {
//         return Messages.find({}, { sort: [["score", "desc"]] });
//       } else {
//         return Messages.find({});
//       }
//     }
//   });
// }

// if (Meteor.isServer) {

//   Meteor.startup(function () {
//     Messages._ensureIndex({
//       "value": "text"
//     });
//     seed();
//   });

//   Meteor.publish("search", function(searchValue) {
//     if (!searchValue) {
//       return Messages.find({});
//     }
//     console.log("Searching for ", searchValue);
//     var cursor = Messages.find(
//       { $text: {$search: searchValue} },
//       {

//         fields: {
//           score: { $meta: "textScore" }
//         },

//         sort: {
//           score: { $meta: "textScore" }
//         }
//       }
//     );
//     return cursor;
//   });
// }

// function seed() {
//   if (!Messages.findOne({})) {
//     Messages.insert({title: "Cookie", value: "Cookie"});
//     Messages.insert({title: "Cake", value: "Cake"});
//     Messages.insert({title: "Existential", value: "I like eating pancakes."});
//     Messages.insert({title: "Sugar overdose", value: "I enjoy baking cake cake cakes cakes."});
//   }
// }