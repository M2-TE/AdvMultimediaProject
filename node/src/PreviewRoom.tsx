import React from 'react';
import * as SWRTC from '@andyet/simplewebrtc';
import MediaPreview from './components/MediaPreview';
import { UserMediaIds } from '@andyet/simplewebrtc/components/RequestUserMedia';

interface Props {
    enterRoom: any;
};
interface State {
    permissions: boolean;
};
export default class PreviewRoom extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.permissionsGranted = this.permissionsGranted.bind(this);
        this.permissionsDenied = this.permissionsDenied.bind(this);

        this.state = {
            permissions: false,
        };
    }

    permissionsGranted(trackIds?: UserMediaIds) {
        console.log('perm toggled');
        this.setState((state) => ({
            permissions: true
        }));
    }

    permissionsDenied(err?: Error) { console.log(err); }

    render() {
        console.log('PreviewRoom rendered');
        return (
            <div>
                {/* Get permissions to use the user's media devices */}
                <SWRTC.RequestUserMedia audio video auto
                    onSuccess={this.permissionsGranted}
                    onError={this.permissionsDenied} />

                {/* Preview the Media that was returned during the media request */}
                <SWRTC.LocalMediaList
                    screen={false}
                    render={({ media }) => {
                        const previewVideo = media.filter(m => m.kind === "video")[0]
                        const previewAudio = media.filter(m => m.kind === "audio")[0]
                        return <MediaPreview enterRoom={this.props.enterRoom} video={previewVideo} audio={previewAudio} />
                    }}
                />
            </div>
        );
    }
}