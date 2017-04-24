import {h, Component} from 'preact';
import Folder from '../folder';

export default class Galleries extends Component {
    render (props, state) {

        let folders = (props.folders || []).map((folder, i) => {
            return (
                <Folder key={i.toString()}
                        id={folder.id}
                        name={folder.name}
                        iconLink={folder.iconLink}/>
            );
        });

        return (
            <div className="view" id="galleries">
                <h1>Galleries</h1>
                <div className="view-list">
                    {folders}
                </div>
            </div>
        );
    }
}
