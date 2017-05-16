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
            <div className={'modal' + (this.props.isOpen ? '' : ' hidden')}
                 id="view-image-modal">
                <div className="modal-content">
                    <button onClick={this.close}>X</button>
                    <Image src={props.url}/>
                </div>
            </div>
        );
    }
}
