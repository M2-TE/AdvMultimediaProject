import React from 'react';
import * as SWRTC from '@andyet/simplewebrtc';
import MediaPreview from './components/MediaPreview';
import { UserMediaIds } from '@andyet/simplewebrtc/components/RequestUserMedia';

interface Props {
    store: any;
};
interface State {
    permissions: boolean;
    videoEnabled: boolean;
    audioEnabled: boolean;
};
export default class PreviewRoom extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.permissionsGranted = this.permissionsGranted.bind(this);
        this.permissionsDenied = this.permissionsDenied.bind(this);
        this.toggleAudio = this.toggleAudio.bind(this);
        this.toggleVideo = this.toggleVideo.bind(this);

        this.state = {
            permissions: false,
            videoEnabled: true,
            audioEnabled: true
        };
    }

    permissionsGranted(trackIds?: UserMediaIds) {
        this.setState((state) => ({
            permissions: true,
            videoEnabled: state.videoEnabled,
            audioEnabled: state.audioEnabled
        }));
    }

    toggleAudio() {
        this.setState((state) => ({
            permissions: state.permissions,
            videoEnabled: state.videoEnabled,
            audioEnabled: !state.audioEnabled
        }));
    }

    toggleVideo() {
        this.setState((state) => ({
            permissions: state.permissions,
            videoEnabled: !state.videoEnabled,
            audioEnabled: state.audioEnabled
        }));
    }

    permissionsDenied(err?: Error) { console.log(err); }

    render() {
        console.log('PreviewRoom rendered');
        return (
            <div>
                {/* Get permissions to use the user's media devices */}
                permissions ? : (
                <SWRTC.RequestUserMedia audio video auto
                    onSuccess={this.permissionsGranted}
                    onError={this.permissionsDenied} />)

                {/* Preview the Media that was returned during the media request */}
                <SWRTC.LocalMediaList
                    screen={false}
                    render={({ media }) => {
                        const previewVideo = this.state.videoEnabled ? media.filter(m => m.kind === "video")[0] : undefined;
                        const previewAudio = this.state.audioEnabled ? media.filter(m => m.kind === "audio")[0] : undefined;
                        return <MediaPreview video={previewVideo} toggleVideo={this.toggleVideo} toggleAudio={this.toggleAudio} />
                    }}
                />
            </div>
        );
    }
}