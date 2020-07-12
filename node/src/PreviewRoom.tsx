import React from 'react';
import * as SWRTC from '@andyet/simplewebrtc';
import MediaPreview from './components/MediaPreview';

interface Props {
    store: any;
};
interface State {
    permissions: boolean;
    videoMedia?: SWRTC.Media;
};
export default class PreviewRoom extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            permissions: false
        };

        const constraints = {
            video: true,
            audio: true
        }

        // navigator.mediaDevices.getUserMedia(constraints)
        //     .then((stream) => {
        //         this.setState((state) => {
        //             return {
        //                 permissions: true,
        //                 videoMedia: {
        //                     createdAt: 0, id: 'test', kind: "video", remoteDisabled: false, localDisabled: false, screenCapture: false, speaking: false,
        //                     renderMirrored: false, volume: 1, source: "local", stream: stream, track: stream.getVideoTracks()[0]
        //                 }
        //             };
        //         })
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     })
    }

    render() {
        console.log('videoView rendered');
        console.log(this.state.videoMedia);
        return (
            <div>
                <SWRTC.RequestUserMedia audio video auto />
                <SWRTC.LocalMediaList
                    screen={false}
                    render={({ media }) => {
                        console.log(media);

                        // const previewVideo = media.filter(m => m.id === this.state.previewVideoId)[0];
                        // const previewAudio = media.filter(m => m.id === this.state.previewAudioId)[0];
                        return <MediaPreview video={media[1]} toggleVideo={null} toggleAudio={null} />
                    }}
                />
            </div>
        );
    }
}