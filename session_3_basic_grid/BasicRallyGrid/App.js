// Custom Rally App that displays Stories in a grid.
//
// Note: various console debugging messages intentionally kept in the code for learning purposes

Ext.define('CustomApp', {
    extend: 'Rally.app.App',      // The parent class manages the app 'lifecycle' and calls launch() when ready
    componentCls: 'app',          // CSS styles found in app.css

    // Entry Point to App
    launch: function() {

      console.log('our first app');     // see console api: https://developers.google.com/chrome-developer-tools/docs/console-api
      this._loadData();                 // we need to prefix with 'this.' so we call a method found at the app level.
    },

    // Get data from Rally
    _loadData: function() {

      var myStore = Ext.create('Rally.data.wsapi.Store', {
          model: 'User',
          autoLoad: true,                         // <----- Don't forget to set this to true! heh
          listeners: {
              load: function(myStore, myData, success) {
                  console.log('got data!', myStore, myData);
                  this._loadGrid(myStore);      // if we did NOT pass scope:this below, this line would be incorrectly trying to call _createGrid() on the store which does not exist.
              },
              scope: this                         // This tells the wsapi data store to forward pass along the app-level context into ALL listener functions
          },
          fetch: ['UserName', 'FirstName', 'LastName', 'DisplayName', 'OnpremLdapUsername', 'TeamMemberships']   // Look in the WSAPI docs online to see all fields available!
        });

    },

    // Create and Show a Grid of given stories
    _loadGrid: function(myUserStore) {

      var myGrid = Ext.create('Rally.ui.grid.Grid', {
        store: myUserStore,
        columnCfgs: [         // Columns to display; must be the same names specified in the fetch: above in the wsapi data store
          'UserName', 'FirstName', 'LastName', 'DisplayName', 'OnpremLdapUsername', 'TeamMemberships'
        ]
      });

      this.add(myGrid);       // add the grid Component to the app-level Container (by doing this.add, it uses the app container)

      console.log('what is this?', this);

    }

});

