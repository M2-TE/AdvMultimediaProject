import React from 'react';
import * as SWRTC from '@andyet/simplewebrtc';

const configUrl = 'https://api.simplewebrtc.com/config/guest/413edda4665ecafd9710bee2';

interface Props {
    name: string;
    roomName: string;
    roomPassword: string;
    audioActive: boolean;
    videoActive: boolean;
};
interface State {
    name: string;
    roomName: string;
    roomPassword: string;
    videoActive: boolean;
    audioActive: boolean;
};
export default class Room extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // deep copy room details into the state object
        this.state = {
            name: this.props.name,
            roomName: this.props.roomName,
            roomPassword: this.props.roomPassword,
            videoActive: this.props.videoActive,
            audioActive: this.props.audioActive,
        }
    }


    render() {
        return (
            <SWRTC.Provider configUrl={configUrl}>
                {/* Render based on the connection state */}
                <SWRTC.Connecting>
                    <h1>Connecting...</h1>
                </SWRTC.Connecting>

                <SWRTC.Connected>
                    {/* Request the user's media */}
                    <SWRTC.RequestUserMedia audio video auto />

                    {/* Enable playing remote audio. */}
                    <SWRTC.RemoteAudioPlayer />

                    {/* Connect to a room with a name and optional password */}
                    <SWRTC.Room name={this.state.roomName} password={this.state.roomPassword}>
                        {props => {
                            return (
                                <div></div>
                                // <MediaPreview video={this.state.videoActive ? props.localMedia[1] : undefined} toggleVideo={this.toggleVideoActive} toggleAudio={this.toggleAudioActive} />
                            );
                        }}
                    </SWRTC.Room>
                </SWRTC.Connected>
            </SWRTC.Provider>
        );
    }
}