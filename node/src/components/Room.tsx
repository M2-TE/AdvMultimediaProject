import React from 'react';
import { Video, Notifications } from '@andyet/simplewebrtc';
import * as SWRTC from '@andyet/simplewebrtc';
import styled from 'styled-components';

const Container = styled.div({
    width: '100%',
    color: '#e9ecec'
});

const UserContainer = styled.div({
    width: '15%',
    backgroundColor: '#333333',
    position: 'absolute',
    top: '7%',
    left: '1%',
    bottom: '61%'
});

const ChatContainer = styled.div({
    width: '15%',
    marginTop: '10px',
    backgroundColor: '#555555',
    position: 'absolute',
    top: '40%',
    left: '1%',
    bottom: '2%'
});

const MainContainer = styled.div({
    position: 'absolute',
    left: '17%',
    top: '7%',
    right: '1%',
    bottom: '2%',
});

const MainVideoContainer = styled.div({
    width: '100%',
    height: '100%',
    maxHeight: 'calc(var(--vh, 1vh) * 100)',
    '& video': {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
});

const LoadingState = styled.div({
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 0%',
    justifyContent: 'center',
    position: 'relative'
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
                    <SWRTC.Connecting>
                        <LoadingState>
                            <h1>Connecting...</h1>
                        </LoadingState>
                    </SWRTC.Connecting>
                    <SWRTC.Disconnected>
                        <LoadingState>
                            <h1>Lost connection. Reattempting to join...</h1>
                        </LoadingState>
                    </SWRTC.Disconnected>
                    <SWRTC.Failed>
                        <LoadingState>
                            <h1>Connection failed.</h1>
                        </LoadingState>
                    </SWRTC.Failed>

                    <SWRTC.Connected>
                        {/* Request the user's media */}
                        <SWRTC.RequestUserMedia audio video auto />

                        {/* Enable playing remote audio. */}
                        <SWRTC.RemoteAudioPlayer />

                        {/* Notify client about peer-related events */}
                        <Notifications
                            onPeerEntered={(peer: SWRTC.Peer) => { console.log("peer entered.") }}
                            onPeerLeft={(peer: SWRTC.Peer) => { console.log("peer left.") }}
                            onChatReceived={(chat: SWRTC.Chat) => { console.log("chat message received.") }} />

                        {/* Connect to a room with a name and optional password */}
                        <SWRTC.Room name={this.state.roomName} password={this.state.roomPassword}>
                            {props => {
                                const localVideo = props.localMedia.filter(m => m.kind === "video")[0];
                                const remoteVideos = props.remoteMedia.filter(m => m.kind === "video");
                                const vidId = remoteVideos[0]?.owner?.split('/')[1];
                                return (
                                    <div>
                                        <UserContainer>
                                            <div>User Info</div>
                                        </UserContainer>
                                        <ChatContainer>
                                            <div>Chat</div>
                                        </ChatContainer>
                                        <MainContainer>
                                            {/* <div>Video</div> */}
                                            <MainVideoContainer>
                                                <Video media={localVideo} qualityProfile={'low'}></Video>
                                            </MainVideoContainer>
                                            {/* <Video media={remoteVideos[0]}></Video> */}
                                        </MainContainer>
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