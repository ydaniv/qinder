import {h, Component} from 'preact';
import Folder from '../folder';
import AddGalleryModal from './add-gallery-modal';

export default class Galleries extends Component {
    render (props, state) {

        let folders = (props.folders || []).map((folder, i) => {
            return (
                <Folder key={i.toString()}
                        id={folder.id}
                        name={folder.name}
                        icon={folder.icon}/>
            );
        });

        return (
            <div className="view" id="galleries">
                <AddGalleryModal isOpen={this.props.isAddModalOpen}
                                 close={this.props.closeAddModal}
                                 addGallery={this.props.addGallery}/>
                <h1>Galleries</h1>
                <div className="view-list">
                    {folders}
                </div>
            </div>
        );
    }
}
