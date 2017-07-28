Websites = new Mongo.Collection("websites");


if (Meteor.isClient) {

	Meteor.subscribe('websites');

  Template.search.events({
    "submit #search": function (e) {
      e.preventDefault();
      Session.set("searchValue", $("#searchValue").val());
      console.log(searchValue);
    }
  });

  Template.demo.events({
    "submit #demo": function (e) {
      e.preventDefault();
      Session.set("demoValue", $("#demoValue").val());
      console.log(demoValue);
    }

  });

  Template.demo.helpers({
    websites: function() {
        console.log("where");
        Meteor.subscribe("demo", Session.get("demoValue"));
        var demoValue = Session.get("demoValue");
        console.log("where");
        if (Session.get("demoValue")) {
          console.log(demoValue);
          var demo = new RegExp(demoValue, 'i');
          return Websites.find(

            {
                $or : [
                     {"title": demo} ,
                     {"description": demo}
                ]
            },
          )
        }
        else {
          return Websites.find({}, {sort: {upvotes: -1}});
          }
    }
  });


  Template.search.helpers({
    websites: function() {
        Meteor.subscribe("search", Session.get("searchValue"));
  		  var searchValue = Session.get("searchValue");
        console.log(searchValue);
        if (Session.get("searchValue")) {
          var search = new RegExp(searchValue, 'i');
          return Websites.find(

            {
                $or : [
                     {"title": search} ,
                     {"description": search}
                ]
            },
            {sort: {upvotes: -1}}
          )
        }

        else {
          return Websites.find({}, {sort: {upvotes: -1}});
          }
    }
  });


}; //end of client


if (Meteor.isServer) {
    Websites._ensureIndex({
      "description": "text",
 		   "title": "text",
    });

  Meteor.publish("search", function(searchValue) {
    if (searchValue) {
       // console.log(searchValue)
        return Websites.find(
        {$text: {$search: searchValue}},
        {fields: {score:{
        		$meta: 'textScore' //returns for each matching document the metadata
        	 },
        },
        sort:{
        	score:{
        		$meta:'textScore' //Returns the score associated with the corresponding $text query for each matching document. 
        	}
            }
        }
      );
    } 
});


  Meteor.publish("demo", function(demoValue) {
    console.log("test")
    if (demoValue) {
       console.log(demoValue)
        return Websites.find(
        {$text: {$demo: demoValue}},
        {fields: {score:{
            $meta: 'textScore' //returns for each matching document the metadata
           },
        },
        sort:{
          score:{
            $meta:'textScore' //Returns the score associated with the corresponding $text query for each matching document. 
          }
            }
        }
      );
    } 
});




  // set up security on websites collection
  Websites.allow({
	// we need to be able to update websites for voting
	update:function(userId, doc){	
		if (Meteor.user()){// they are logged in
			return true;
		} else {// user not logged in - do not let them update  (rate) the image. 
			return false;
		}
	},

	insert:function(userId, doc){
		
		if (Meteor.user()){// they are logged in
			if (userId != doc.createdBy){// the user is messing about
				return false;
			}
			else {// the user is logged in, the image has the correct user id
				return true;
			}
		}
		else {// user not logged in
			return false;
		}
	}, 

	remove:function(userId, doc){
		if (Meteor.user()){// they are logged in
			if (userId != doc.createdBy){// the user is messing about
				return false;
			}
							
			else {// the user is logged in, the image has the correct user id
				return true;
			}
		}
		else {// user not logged in
			return false;
		}
		// return true;
	},
});

	Meteor.publish('websites', function() {
	return Websites.find();
	 });

};






