import {h, Component} from 'preact';
import {Router} from 'preact-router';

import Header from './header';
import Galleries from './galleries';
import Album from './album';
import Backend from '../lib/backends/drive';
import config from './config';

export default class App extends Component {
    constructor (props) {
        super(props);

        this.addGallery = this.addGallery.bind(this);
        this.openAddGalleryModal = this.openAddGalleryModal.bind(this);
        this.closeAddGalleryModal = this.closeAddGalleryModal.bind(this);

        this.state = {
            logged_in: false,
            isAddModalOpen: false,
            galleries: [],
            files: []
        };

        this.drive_client =  new Backend(config);

        this.drive_client.ready.then((signed_in) => {
            this.setState({ logged_in: signed_in });
        });
    }

    loadGallery(galleryId) {
        this.drive_client.ready
            .then(() => this.drive_client.getFile(galleryId))
            .then(folder => this.setState({ files: this.state.files.concat([folder]) }));
    }

    openAddGalleryModal () {
        this.setState({
            isAddModalOpen: true
        });
    }

    closeAddGalleryModal () {
        this.setState({
            isAddModalOpen: false
        });
    }

    addGallery (galleryId) {
        this.setState({
            galleries: this.state.galleries.concat([galleryId])
        });

        this.loadGallery(galleryId);
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
                        signIn={this.drive_client.signIn}
                        openAddGalleryModal={this.openAddGalleryModal}/>
                <Router onChange={this.handleRoute}>
                    <Galleries path="/"
                               folders={this.state.files}
                               isAddModalOpen={this.state.isAddModalOpen}
                               closeAddModal={this.closeAddGalleryModal}
                               addGallery={this.addGallery}/>
                    <Album path="/:folder_id/"
                           backend={this.drive_client}/>
                </Router>
            </div>
        );
    }
}
