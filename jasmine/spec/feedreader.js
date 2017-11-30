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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should contain non empty url', () => {
          allFeeds.forEach(feed => {
            expect(feed.url).toBeTruthy();
          });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should contain non empty name', () => {
           allFeeds.forEach(feed => {
             expect(feed.name).toBeTruthy();
           })
         })
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', () => {
      /* TODO: Write a test that ensures the menu element is
      * hidden by default. You'll have to analyze the HTML and
      * the CSS to determine how we're performing the
      * hiding/showing of the menu element.
      */
      it('should be hidden by default', () => {
        expect($('body').hasClass('menu-hidden')).toBeTruthy();
      });
      /* TODO: Write a test that ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * should have two expectations: does the menu display when
      * clicked and does it hide when clicked again.
      */
      // Declare varable
      let menuVisible,
          menuInvisible;
      // The menu should be visible when its clicked
      it('should be visibile when menu icon is clicked', () => {
        $('.menu-icon-link').trigger('click');
        menuVisible = $('body').hasClass('menu-hidden');
        expect(menuVisible).toBeFalsy();
      });

      // The menu should be invisible when its clicked
      it('should be invisibile when menu icon is clicked again', () => {
        $('.menu-icon-link').trigger('click');
        menuInvisible = $('body').hasClass('menu-hidden');
        expect(menuInvisible).toBeTruthy();
      });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {
      /* TODO: Write a test that ensures when the loadFeed
      * function is called and completes its work, there is at least
      * a single .entry element within the .feed container.
      * Remember, loadFeed() is asynchronous so this test will require
      * the use of Jasmine's beforeEach and asynchronous done() function.
      */
      beforeEach(done => {
        // initial the feeds before checking
        $('.feed').empty();
        loadFeed(0, done);
      });

      it('should contain at least one entry element within the feed container', () => {
        expect($('.feed .entry').html().length).toBeGreaterThan(0);
      })
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
      /* TODO: Write a test that ensures when a new feed is loaded
      * by the loadFeed function that the content actually changes.
      * Remember, loadFeed() is asynchronous.
      */
      let contentInitial,
          contentUpdated;

      beforeEach(done => {
        // initial the feeds before checking
        $('.feed').empty();

        loadFeed(0, () => {
          contentInitial = $('.feed').html();
          done();
        });
      });

      // Check if new feed is updated or not
      it('should update its content', done => {
        loadFeed(1, () => {
          // updated content
          contentUpdated = $('.feed').html();

          // chenck if new feed equals preview content
          expect(contentUpdated).not.toEqual(contentInitial);
          done();
        });
      });
    });
}());
