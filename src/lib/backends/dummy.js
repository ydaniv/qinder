/**
 * Client for dummy backend.
 *
 * @class Backend
 */
export default class Backend {
    constructor (config) {
        //super(config);
        this.files = [];

        this.ready = Promise.resolve(true);
    }

    /**
     * Get file list.
     */
    listFolders (size=100) {
        return Promise.resolve([
            {
                id: '1',
                name: 'one',
                mimeType: 'application/vnd',
                iconLink: 'link',
                thumbnailLink: ''
            },
            {
                id: '2',
                name: 'two',
                mimeType: 'application/vnd',
                iconLink: 'link2',
                thumbnailLink: ''
            },
            {
                id: '3',
                name: 'three',
                mimeType: 'application/vnd',
                iconLink: 'link3',
                thumbnailLink: ''
            }
        ]);
    }

    /**
     * Get file list.
     */
    listFiles (folder, size=100) {
        return Promise.resolve([
            {
                id: '1',
                name: 'one',
                mimeType: 'image/jpeg',
                iconLink: '',
                thumbnailLink: 'thumb'
            },
            {
                id: '2',
                name: 'two',
                mimeType: 'image/jpeg',
                iconLink: '',
                thumbnailLink: 'thumb2'
            },
            {
                id: '3',
                name: 'three',
                mimeType: 'image/jpeg',
                iconLink: '',
                thumbnailLink: 'thumb3'
            }
        ]);
    }
}
