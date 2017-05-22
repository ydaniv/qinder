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

    componentDidUpdate (prevProps) {
        let currentSrc = this.props.src;

        if ( currentSrc !== this.lastImageSrc ) {
            this.lastImageSrc = currentSrc;

            this.setState({
                show: false
            });

            this.loadImage(currentSrc);
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
        return <div className={'image ' + (state.show ? 'show' : 'loading')}>
            <figure style={`background-image: url("${state.url}")`}></figure>
        </div>;
    }
}
