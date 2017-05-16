import {h, Component} from 'preact';

import {load} from '../lib/utils/image-loader';

/* For some reason GDrive links come with a param
 that enforces a download which we need to remove */
function removeExportParam (url) {
    return url && url.replace(/export=[^&]+/, '');
}

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
        load(removeExportParam(src))
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
