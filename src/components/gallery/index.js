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

    componentWillReceiveProps () {
        let client = this.props.backend;

        client.ready.then(() => {
            client.listFiles(this.props.folder_id)
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
}
