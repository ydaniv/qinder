import {h, Component} from 'preact';

import {load} from '../lib/utils/image-loader';

export default class Image extends Component {
    constructor (props) {
        super(props);

        this.state = {
            url: '',
            show: false
        };

        if ( props.src ) {
            this.loadImage(props.src);
        }
    }

    componentWillUpdate (nextProps) {
        if ( nextProps.src !== this.lastImageSrc ) {
            this.lastImageSrc = nextProps.src;
            this.loadImage(nextProps.src);
        }
    }

    componentDidUnmount () {
        this.setState({
            url: '',
            show: false
        });
    }

    loadImage (src) {
        load(src)
            .then((url) => {
                this.setState({
                    url: url,
                    show: true
                });
            });
    }

    render (props, state) {
        return <figure className={'image' + (state.show ? ' show' : '')}
                       style={`background-image: url("${state.url}")`}></figure>;
    }
}
