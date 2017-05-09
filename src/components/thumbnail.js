import {h, Component} from 'preact';

import {load} from '../lib/utils/image-loader';

export default class Thumbnail extends Component {
    constructor (props) {
        super(props);

        this.state = {
            url: '',
            show: false
        };

        load(props.src)
            .then((url) => {
               this.setState({
                   url: url,
                   show: true
               });
            });
    }

    componentDidUnmount () {
        this.setState({
            url: '',
            show: false
        });
    }

    render (props, state) {
        return (
            <figure key={props.id} className="thumbnail">
                <a href={`/${props.id}/`}
                   className={state.show ? 'show' : ''}
                   style={`background-image: url("${state.url}")`}></a>
            </figure>
        );
    }
}
