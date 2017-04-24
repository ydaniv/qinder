import {h, Component} from 'preact';

export default class Thumbnail extends Component {
    render (props, state) {
        return (
            <figure key={props.id} className="thumbnail">
                <a href={`/${props.id}/`}>
                    <img src={props.src}
                         alt={props.name}/>
                </a>
            </figure>
        );
    }
}
