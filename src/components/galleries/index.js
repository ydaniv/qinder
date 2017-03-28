import {h, Component} from 'preact';

export default class Galleries extends Component {
    render (props, state) {

        let images = (props.images || []).map((img, i) => {
            return <img src={img.thumbnailLink} key={i.toString()}/>
        });

        return (
            <div className="view" id="galleries">
                <h1>Galleries</h1>
                <div>
                    {images}
                </div>
            </div>
        );
    }
}
