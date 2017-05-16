import {h, Component} from 'preact';

export default class Folder extends Component {
    render (props, state) {
        return (
            <figure key={props.id} className="folder">
                <a href={`/album/${props.id}/`}>
                    <img src={props.icon}
                         alt={props.name}/>
                    <figcaption className="folder-caption ellipsis">{props.name}</figcaption>
                </a>
            </figure>
        );
    }
}
