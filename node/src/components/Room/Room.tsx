import React from 'react';
import { Video, Notifications } from '@andyet/simplewebrtc';
import * as SWRTC from '@andyet/simplewebrtc';
import * as RS from './RoomStyling';
import jwt from 'jsonwebtoken';
import { removeAllMedia } from '@andyet/simplewebrtc/actions';

let userDataToken = undefined;
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

    pinnedPeer?: SWRTC.Peer;
};
export default class Room extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.updateContainers = this.updateContainers.bind(this);

        userDataToken = jwt.sign(
            {
                username: this.props.username
            },
            'bc7251e9-8298-4cc4-9c88-d47b303c304f'
        );

        // deep copy room details into the state object
        this.state = {
            username: this.props.username,
            roomName: this.props.roomName,
            roomPassword: this.props.roomPassword,
            videoActive: this.props.videoActive,
            audioActive: this.props.audioActive,
        }
    }

    updateContainers() {

    };

    render() {
        return (
            <SWRTC.Provider configUrl={'https://api.simplewebrtc.com/config/user/413edda4665ecafd9710bee2'} userData={userDataToken} >
                <RS.Container>
                    <SWRTC.Connecting>
                        <RS.LoadingState>
                            <h1>Connecting...</h1>
                        </RS.LoadingState>
                    </SWRTC.Connecting>
                    <SWRTC.Disconnected>
                        <RS.LoadingState>
                            <h1>Lost connection. Reattempting to join...</h1>
                        </RS.LoadingState>
                    </SWRTC.Disconnected>
                    <SWRTC.Failed>
                        <RS.LoadingState>
                            <h1>Connection failed.</h1>
                        </RS.LoadingState>
                    </SWRTC.Failed>

                    <SWRTC.Connected>
                        {/* <SWRTC.RequestUserMedia audio={this.state.audioActive} video={this.state.videoActive} auto /> */}
                        <SWRTC.RemoteAudioPlayer />

                        {/* Notify client about peer-related events */}
                        <Notifications
                            onPeerEntered={this.updateContainers}
                            onPeerLeft={this.updateContainers}
                            onChatReceived={(chat: SWRTC.Chat) => { console.log("chat message received.") }} />

                        {/* Connect to a room with a name and optional password */}
                        <SWRTC.Room name={this.state.roomName} password={this.state.roomPassword}>
                            {props => {

                                const localVideo = props.localMedia.filter(m => m.kind === "video")[0];
                                const remoteVideos = props.remoteMedia.filter(m => m.kind === "video");


                                // create main video content
                                let mainVideo;
                                {
                                    if (this.state.pinnedPeer == undefined) {
                                        // set local user as pinned
                                        if (this.state.videoActive) {
                                            mainVideo = <Video media={localVideo} qualityProfile={'high'} />;
                                        } else {
                                            mainVideo =
                                                <h1 style={{ textAlign: 'center', position: 'absolute', top: '45%', width: '100%' }}>
                                                    {this.state.username} (You)
                                                </h1>
                                        }
                                    } else {
                                        // set remote user as pinned
                                        const mainPeerVideo = props.remoteMedia.filter(m => m.id.split['/'][1] === this.state.pinnedPeer?.id && m.kind === "video")[0];
                                        if (mainPeerVideo != undefined) {
                                            mainVideo = <Video media={mainPeerVideo} qualityProfile={'high'} />;
                                        } else {
                                            mainVideo =
                                                <h1 style={{ textAlign: 'center', position: 'absolute', top: '45%', width: '100%' }}>
                                                    {this.state.pinnedPeer.displayName} (You)
                                                </h1>
                                        }
                                    }
                                }

                                // create side windows
                                let sideVideos: any[] = [];
                                {
                                    // add own video to side vids if not centered
                                    if (this.state.pinnedPeer != undefined) {
                                        sideVideos.push(
                                            {
                                                username: this.state.username,
                                                media: localVideo
                                            });
                                    }

                                    // add all other non-pinned peers
                                    remoteVideos.forEach(element => {
                                        if (this.state.pinnedPeer == undefined
                                            || this.state.pinnedPeer != undefined && element.id != this.state.pinnedPeer.id) {
                                            const customerData: any = props.peers.filter(peer => peer.id === element.owner?.split("/")[1])[0].customerData;
                                            const username = customerData.username;
                                            sideVideos.push(
                                                {
                                                    username: username,
                                                    media: element
                                                });
                                        }
                                    });
                                }

                                // render site content
                                return (
                                    <SWRTC.UserControls render={({ mute, unmute, isMuted }) => {
                                        if (this.state.audioActive == false && !isMuted) {
                                            mute();
                                        }
                                        return (
                                            <div><RS.UserContainer>
                                                <div>User Info</div>
                                            </RS.UserContainer>
                                                <RS.ChatContainer>
                                                    <div>Chat</div>
                                                </RS.ChatContainer>
                                                <RS.MainContainer>
                                                    {/* Center Video/User */}
                                                    <RS.MainVideoContainer>
                                                        {mainVideo}
                                                    </RS.MainVideoContainer>

                                                    {/* Videos/Users that are not in focus */}
                                                    {<RS.SideVideosContainer>
                                                        {
                                                            sideVideos.map(function (peerDetails) {
                                                                return (
                                                                    <RS.SidePeerContainer onClick={() => { console.log('peer clicked') }}>
                                                                        <RS.SideVideoExtraContent>
                                                                            <p>{peerDetails.username}</p>
                                                                        </RS.SideVideoExtraContent>
                                                                        <RS.SideVideoContainer>
                                                                            {
                                                                                peerDetails.media == undefined
                                                                                    ? <div></div>
                                                                                    : <Video media={peerDetails.media} qualityProfile={'low'} />
                                                                            }
                                                                        </RS.SideVideoContainer>
                                                                    </RS.SidePeerContainer>
                                                                )
                                                            })
                                                        }
                                                    </RS.SideVideosContainer>}
                                                </RS.MainContainer>
                                            </div>
                                        );
                                    }} />
                                );
                            }}
                        </SWRTC.Room>
                    </SWRTC.Connected>
                </RS.Container>
            </SWRTC.Provider>
        );
    }
}