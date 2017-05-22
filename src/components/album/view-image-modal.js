import {h, Component} from 'preact';

import Image from '../image';

export default class ViewImageModal extends Component {
    constructor (props) {
        super(props);

        this.close = this.close.bind(this);
        this.star = this.star.bind(this);
    }

    close () {
        this.props.close();
    }

    star () {
        this.props.backend.starFile(this.props.id);
    }

    render (props, state) {
        return (
            <div className={'modal' + (props.isOpen ? '' : ' hidden')}
                 id="view-image-modal">
                <div className="modal-content">
                    <div className="modal-buttons">
                        <button onClick={this.close}>X</button>
                        <a className="button" href={props.download}
                           download={props.name}
                           target="_blank">D</a>
                        <button onClick={this.star}>S</button>
                    </div>
                    <Image src={props.url}/>
                </div>
            </div>
        );
    }
}
