import {h, Component} from 'preact';

import Image from '../image';

export default class ViewImageModal extends Component {
    constructor (props) {
        super(props);

        this.close = this.close.bind(this);
    }

    close () {
        this.props.close();
    }
    render (props, state) {
        return (
            <div className={'modal' + (props.isOpen ? '' : ' hidden')}
                 id="view-image-modal">
                <div className="modal-content">
                    <button onClick={this.close}>X</button>
                    <a className="button" href={props.download}
                       download={props.name}
                       target="_blank">D</a>
                    <Image src={props.url}/>
                </div>
            </div>
        );
    }
}
