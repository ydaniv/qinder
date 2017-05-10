import {h} from 'preact';
import Image from './image';

export default class Thumbnail extends Image {

    render (props, state) {
        return (
            <figure key={props.id} className="thumbnail">
                <a href={`/image/${props.id}/`}
                   className={state.show ? 'show' : ''}
                   style={`background-image: url("${state.url}")`}></a>
            </figure>
        );
    }
}
