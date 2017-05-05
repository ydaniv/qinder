import {h, Component} from 'preact';

export default class AddGalleryModal extends Component {
    constructor (props) {
        super(props);

        this.close = this.close.bind(this);
        this.approve = this.approve.bind(this);
        this.setGallery = this.setGallery.bind(this);

        this.state = {
            value: ''
        };
    }

    setGallery (e) {
        this.gallery = e.target.value;
    }

    approve () {
        if ( this.gallery ) {
            this.props.addGallery(this.gallery);
            this.close();
        }
        else {
            // alert error
        }
    }

    close () {
        this.gallery = null;
        this.setState({
            value: ''
        });
        this.props.close();
    }

    render (props, state) {

        return (
            <div className={'modal' + (this.props.isOpen ? '' : ' hidden')}
                 id="add-gallery-modal">
                <h1 className="modal-header">Add Gallery</h1>
                <div className="modal-content">
                    <input type="text"
                           value={this.state.value}
                           onChange={this.setGallery}/>
                    <button onClick={this.approve}>Add</button>
                    <button onClick={this.close}>Cancel</button>
                </div>
            </div>
        );
    }
}
