/**
 * Client for Google Drive API.
 *
 * @class Drive
 * @see https://developers.google.com/drive/v3/web/quickstart/js
 */
export default class Drive {
    constructor (config) {
        //super(config);
        this.files = [];

        // Client ID and API key from the Developer Console
        this.client_id = config.DRIVE_CLIENT_ID;

        // Array of API discovery doc URLs for APIs used by the quickstart
        this.discovery_docs = config.discovery_docs ||
            ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

        // Authorization scopes required by the API; multiple scopes can be
        // included, separated by spaces.
        this.scopes = config.scopes ||
            'https://www.googleapis.com/auth/drive.photos.readonly';

        this.ready = new Promise((resolve, reject) => {
            this._init_resolve = resolve;
            this._init_reject = reject;
        });

        this.load();
    }

    /**
     *  Loads the auth2 library and API client library.
     */
    load () {
        gapi.load('client:auth2', this.init.bind(this));
    }

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    init () {
        gapi.client.init({
            discoveryDocs: this.discovery_docs,
            clientId: this.client_id,
            scope: this.scopes
        }).then(() => {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus.bind(this));

            // Handle the initial sign-in state.
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

            this._init_resolve(this.signed_in);
        }, (err) => {
            this._init_reject(err);
        });
    }

    /**
     *  Called when the signed in status changes, to update state
     *  appropriately.
     */
    updateSigninStatus (is_signed_in) {
        return (this.signed_in = is_signed_in);
    }

    /**
     *  Signs in.
     */
    signIn (event) {
        gapi.auth2.getAuthInstance().signIn();
    }

    /**
     *  Signs out.
     */
    signOut (event) {
        gapi.auth2.getAuthInstance().signOut();
    }

    /**
     * Get file list.
     */
    listFiles (size=100) {
        return gapi.client.drive.files.list({
            'spaces': 'photos',
            'pageSize': size,
            'fields': 'nextPageToken, files(id, name, thumbnailLink)'
        }).then(response => {
            return response.result.files;
        });
    }
}
