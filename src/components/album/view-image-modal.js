import {h, Component} from 'preact';

import Image from '../image';

export default class ViewImageModal extends Component {
    constructor (props) {
        super(props);

        this.state = {
            file: {}
        };

        this.close = this.close.bind(this);
    }

    close () {
        this.props.close();
    }

    loadImage () {
        let backend = this.props.backend,
            id = this.state.file.id;
        backend.ready.then(() => {
            backend.getFile(id)
                .then((file) => { this.setState({ file: file })})
        });
    }

    render (props, state) {

        return (
            <div className={'modal' + (this.props.isOpen ? '' : ' hidden')}
                 id="view-image-modal">
                <div className="modal-content">
                    <button onClick={this.close}>X</button>
                    <Image id={state.file.id}
                           name={state.file.name}
                           src={state.file.thumbnailLink}/>
                </div>
            </div>
        );
    }
}
