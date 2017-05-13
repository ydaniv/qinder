import {h, render, rerender} from 'preact';
import {route} from 'preact-router';
import App from 'components/app';
import Backend from 'backends/dummy';

/*global sinon,expect*/

describe('App', () => {
    let scratch;

    before(() => {
        // patch App and replace Drive backend with Dummy
        App.__Rewire__('Backend', Backend);
        scratch = document.createElement('div');
        (document.body || document.documentElement).appendChild(scratch);
    });

    beforeEach(() => {
        scratch.innerHTML = '';
    });

    after(() => {
        scratch.parentNode.removeChild(scratch);
        scratch = null;
        App.__ResetDependency__('Backend');
    });


    describe('routing', () => {
        it('should render the index', () => {
            render(<App />, scratch);

            expect(scratch.firstElementChild.getAttribute('id')).to.equal('app');
        });
    });
});
