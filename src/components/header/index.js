import {h, Component} from 'preact';
import {Link} from 'preact-router';

export default class Header extends Component {

    render (props, state) {
        let auth_button = null;

        if ( props.logged_in ) {
            auth_button = <button className="button" id="sign-out-button">Sign out</button>;
        }
        else {
            auth_button = <button className="button"
                                  id="sign-in-button"
                                  onClick={this.props.signIn}>Sign in</button>;
        }

        return (
            <header className="header">
                <h1>Qinder</h1>
                <nav>
                    <Link href="/">Albums</Link>
                    <button onClick={this.props.openAddGalleryModal}>Add</button>
                </nav>
                {auth_button}
            </header>
        );
    }
}
