import {h} from 'preact';
import Image from './image';

export default class Thumbnail extends Image {

    constructor (props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler (e) {
        this.props.click && this.props.click(this.props.url, e);
    }

    render (props, state) {
        return (
            <figure key={props.id} className="thumbnail"
                    onClick={this.clickHandler}>
                <span className={state.show ? 'show' : ''}
                      style={`background-image: url("${state.url}")`}></span>
            </figure>
        );
    }
}
