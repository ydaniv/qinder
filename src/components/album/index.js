import {h, Component} from 'preact';

import Folder from '../folder';
import Thumbnail from '../thumbnail';
import ViewImageModal from './view-image-modal';

export default class Album extends Component {

    constructor (props) {
        super(props);

        this.state = {
            files: [],
            isViewModalOpen: false,
            imageId: ''
        };

        this.openViewModal = this.openViewModal.bind(this);
        this.closeViewModal = this.closeViewModal.bind(this);
    }

    componentWillMount () {
        this.folderChange(this.props);
    }

    componentWillReceiveProps (props) {
        this.folderChange(props);
    }

    //TODO: refactor to a declarative form
    folderChange (props) {
        const folder = props.folder_id;

        if ( folder !== this.last_folder_id ) {
            this.last_folder_id = folder;
            this.loadFiles(props.backend, folder);
        }
    }

    openViewModal (imageURL) {
        this.setState({
            isViewModalOpen: true,
            imageURL: imageURL
        });
    }

    closeViewModal () {
        this.setState({
            isViewModalOpen: false
        });
    }

    loadFiles (client, folder) {
        client.ready.then(() => {
            client.listFiles(folder)
                .then(files => this.setState({ files: files }));
        });
    }

    render (props, state) {
        return (
            <div className="view" id="album">
                <ViewImageModal isOpen={state.isViewModalOpen}
                                close={this.closeViewModal}
                                backend={props.backend}
                                url={state.imageURL}/>
                <h1>{props.folder_id}</h1>
                <div className="view-list">
                    {state.files.map((file, i) => {
                            return file.mimeType.startsWith('application/vnd') ?
                                <Folder key={i.toString()}
                                        id={file.id}
                                        name={file.name}
                                        iconLink={file.iconLink}/> :
                                <Thumbnail key={i.toString()}
                                           id={file.id}
                                           name={file.name}
                                           src={file.thumbnailLink}
                                           url={file.webContentLink}
                                           click={this.openViewModal}/>;
                        }
                    )}
                </div>
            </div>
        );
    }
};
