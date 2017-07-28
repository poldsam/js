/// routing 

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
    this.render('website_list', {to:"main"});
    this.render('website_form', {to:"navbar"});
});

 
Router.route('/details/:_id', function () {
  this.render('details', {
    to:"main",
    data:function(){
      return Websites.findOne({_id:this.params._id});
    }
  });
});


Accounts.ui.config({
passwordSignupFields: "USERNAME_AND_EMAIL"
});


if (Meteor.isClient) {

	/////
	// template helpers 
	/////

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({}, {sort: {upvotes: -1}});
		},

  });


  Template.website_item.helpers({ 
		getUser:function(user_id){
  		var user = Meteor.users.findOne({_id:user_id});
 		 if (user){
  	 	 return user.username;
	 	 }
	 	 else {
	    return "anon";
		  }
		},
});



  /////
  // template events 
  /////

  Template.website_item.events({
    
    "click .js-upvote":function(event){
      
      // example of how you can access the id for the website in the database
      // (this is the data context for the template)
      var website_id = this._id;
      console.log("Up voting website with id "+website_id);
      var upvotes = $(event.currentTarget).data('upvotes');
      Websites.update({_id: website_id},{$inc: {upvotes:1}});

        return false;// prevent the button from reloading the page
     
   },

    "click .js-downvote":function(event){

      // example of how you can access the id for the website in the database
      // (this is the data context for the template)
      var website_id = this._id;
      console.log("Down voting website with id "+website_id);
      // put the code in here to remove a vote from a website!
      var downvotes = $(event.currentTarget).data('downvotes');
      Websites.update({_id: website_id},{$inc: {downvotes:1}});

      return false;// prevent the button from reloading the page
    },

  'click .delete': function(event, _id){
   var website_id = this._id;
   event.preventDefault();
        Websites.remove(this._id);
   // $("#"+website_id).hide('slow', function(){
   //  Websites.remove({"_id":website_id});
   // }) 
},

  });

  Template.website_form.events({
    "click .js-toggle-website-form":function(event){
      $("#website_form").toggle('slow');
    }, 
    "submit .js-save-website-form":function(event){

      // here is an example of how to get the url out of the form:
      var url = event.target.url.value;
      console.log("The url they entered is: "+url);
      var title = event.target.title.value;
      var description = event.target.description.value;
      //  put your website saving code in here! 
      if (Meteor.user()){
      Websites.insert({
        url:url, 
        title:title, 
        description:description,
        createdOn:new Date(),
        createdBy:Meteor.user()._id,

      });
  }
    $("#website_form").toggle('hide');
    event.target.url.value = "";
    event.target.title.value = "";
    event.target.description.value = "";
      return false;// stop the form submit from reloading the page

    }
  });


};

if (Meteor.isServer) {

	// start up function that creates entries in the Websites databases.
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()){
    	console.log("No websites yet. Creating starter data.");
    	  Websites.insert({
    		title:"Goldsmiths Computing Department", 
    		url:"http://www.gold.ac.uk/computing/", 
    		description:"This is where this course was developed.", 
    		createdOn:new Date()
    	});
    	 Websites.insert({
    		title:"University of London", 
    		url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
    		description:"University of London International Programme.", 
    		createdOn:new Date()
    	});
    	 Websites.insert({
    		title:"Coursera", 
    		url:"http://www.coursera.org", 
    		description:"Universal access to the world’s best education.", 
    		createdOn:new Date()
    	});
    	Websites.insert({
    		title:"Google", 
    		url:"http://www.google.com", 
    		description:"Popular search engine.", 
    		createdOn:new Date()
    	});
    }
  });

}




