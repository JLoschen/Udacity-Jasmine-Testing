/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /*This test suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        //Test to make sure the allFeeds variable is defined
        //subsequent tests depend on the allFeeds variable so test it first
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Make sure feeds that load from the allFeeds array 
        // in app.js have a non empty URL
        it('all Feeds have non empty URL\'s', function() {
            
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeTruthy();
            });
        });

        // Make sure feeds that load from the allFeeds array in app.js
        // have a name
        it('all Feeds have non empty name\'s', function() {
            
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeTruthy();
            });
        });
    });

    //Testing sided menu that hides/shows with top left button
     describe('The Menu', function() {
        
         //make sure side menu doens't fly out til user asks for it
         it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
         
         //Test to make sure clicking the menu button
         // adds and removes the class for hiding the menu.
         //Note:this test assumes the menu starts hidden
         it('hides and shows when clicked.', function(){
             var menuButton = $('.menu-icon-link');
             
             menuButton.click();
             expect($('body').hasClass('menu-hidden')).toBe(false);

             menuButton.click();
             expect($('body').hasClass('menu-hidden')).toBe(true);
         });
 
     });
        
    // Test to make sure can successfully get atleast 1 feed
    //  and place it in the html.
    // Note:this assumes the feed actually has entries
    describe('Initial Entries', function() {
        
        //loadFeed is asynchronous so call 'done' function in it's call back
        //then test will run
        beforeEach(function(done) {
            
            //load index 0 which is the udacity blog
            loadFeed(0,function (){                
                done();
            });   
        });
        
        it('contains atleast one entry once loaded', function(done){
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    //Test what happens when a second blog is loaded
    describe('New Feed Selection', function(){
        
        //to set up test initially load udacity blog
        var firstFeed = '';
        beforeEach(function(done) {
            
            //load udacity blog
            loadFeed(0,function (){
                
                //get udacity feed html
                firstFeed = $('.feed').html();
                done();
            });   
        });
            
        it('contents change when new feed is loaded', function (done){
            
            //load css tricks blog 
            loadFeed(1, function (){
                
                //get html of css tricks
                var secondFeed = $('.feed').html();
                
                //make sure the html changed 
                //Note this test only checks for changes, it doesn't ensure valid html
                expect(firstFeed).not.toBe(secondFeed);
                done();
            });   
        });
    });
}());
