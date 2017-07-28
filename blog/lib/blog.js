Blog.config({
  title: "Portfolio Website",

  rss: {
    title: 'My Portfolio Website',
    description: 'This is an example of a portfolio website'
  }
});

if (Meteor.isClient) {
  ShareIt.init({
    siteOrder: ['facebook', 'twitter'],
    sites: {
      'facebook': {
        'appId': 'YOUR_APPLICATION_ID',
        'version': 'v2.3'
      }
    },
    iconOnly: true,
    applyColors: false
  });
} 
