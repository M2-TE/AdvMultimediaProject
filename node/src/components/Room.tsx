import React from 'react';
import { Media, Video, VolumeMeter } from '@andyet/simplewebrtc';
import * as SWRTC from '@andyet/simplewebrtc';
import styled from 'styled-components';


const Container = styled.div({
    width: '100%',
    color: '#e9ecec',
    backgroundColor: '#222222'
});

interface Props {
    username: string;
    roomName: string;
    roomPassword: string;
    audioActive: boolean;
    videoActive: boolean;
};
interface State {
    username: string;
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
            username: this.props.username,
            roomName: this.props.roomName,
            roomPassword: this.props.roomPassword,
            videoActive: this.props.videoActive,
            audioActive: this.props.audioActive,
        }
    }


    render() {
        return (
            <SWRTC.Provider configUrl={'https://api.simplewebrtc.com/config/guest/413edda4665ecafd9710bee2'}>
                <Container>
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
                                const localVideo = props.localMedia.filter(m => m.kind === "video")[0];
                                const remoteVideos = props.remoteMedia.filter(m => m.kind === "video");
                                return (
                                    <div>
                                        <Video media={localVideo}></Video>
                                        <Video media={remoteVideos[0]}></Video>
                                    </div>
                                );
                            }}
                        </SWRTC.Room>
                    </SWRTC.Connected>
                </Container>
            </SWRTC.Provider>
        );
    }
}