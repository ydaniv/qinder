import {h, Component} from 'preact';

import Folder from '../folder';
import Thumbnail from '../thumbnail';

export default class Gallery extends Component {

    constructor (props) {
        super(props);

        this.state = {
            files: []
        };
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

    loadFiles (client, folder) {
        client.ready.then(() => {
            client.listFiles(folder)
                .then(files => this.setState({ files: files }));
        });
    }

    render (props, state) {
        return (
            <div className="view" id="gallery">
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
                                           src={file.thumbnailLink}/>;
                        }
                    )}
                </div>
            </div>
        );
    }
};
