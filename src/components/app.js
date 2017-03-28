import {h, Component} from 'preact';
import {Router} from 'preact-router';

import Header from './header';
import Galleries from './galleries';
import Drive from '../lib/backends/drive';
import config from './config';

export default class App extends Component {
    constructor (props) {
        super(props);

        this.drive_client =  new Drive(config);

        this.drive_client.ready.then((signed_in) => {
            this.setState({ logged_in: signed_in });

            if ( signed_in ) {
                this.drive_client.listFiles().then(files => {
                    this.setState({ files: files });
                });
            }
        });
    }

    /** Gets fired when the route changes.
     * @param {Object} event        "change" event from [preact-router](http://git.io/preact-router)
     * @param {string} event.url    The newly routed URL
     */
    handleRoute = event => {
        this.currentUrl = event.url;
    };

    render (props, state) {
        return (
            <div id="app">
                <Header logged_in={this.state.logged_in}
                        signIn={this.drive_client.signIn}/>
                <Router onChange={this.handleRoute}>
                    <Galleries path="/"
                               images={this.state.files}/>
                </Router>
            </div>
        );
    }
}
