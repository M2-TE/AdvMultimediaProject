import React from 'react';
import { Video, Notifications } from '@andyet/simplewebrtc';
import * as SWRTC from '@andyet/simplewebrtc';
import * as RS from './RoomStyling';
import jwt from 'jsonwebtoken';
import ToggleButton from 'react-toggle-button';

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
        this.toggleAudioMute = this.toggleAudioMute.bind(this);
        this.toggleVideoMute = this.toggleVideoMute.bind(this);
        this.setPinnedPeer = this.setPinnedPeer.bind(this);

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

    setPinnedPeer(peer: SWRTC.Peer) {
        this.state = {
            username: this.state.username,
            roomName: this.state.roomName,
            roomPassword: this.state.roomPassword,
            videoActive: this.state.videoActive,
            audioActive: this.state.audioActive,
            pinnedPeer: peer
        };
    }

    toggleAudioMute() {
        this.setState((state) => ({
            username: state.username,
            roomName: state.roomName,
            roomPassword: state.roomPassword,
            videoActive: state.videoActive,
            audioActive: !state.audioActive,
            pinnedPeer: state.pinnedPeer
        }));
    };

    toggleVideoMute() {
        this.setState((state) => ({
            username: state.username,
            roomName: state.roomName,
            roomPassword: state.roomPassword,
            videoActive: !state.videoActive,
            audioActive: state.audioActive,
            pinnedPeer: state.pinnedPeer
        }));
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
                                const roomAddress: string =
                                    props.room.address != undefined
                                        ? props.room.address
                                        : '';
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
                                        const mainPeerVideo = props.remoteMedia.filter(m => m.owner?.split('/')[1] === this.state.pinnedPeer?.id && m.kind === "video")[0];
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
                                            || (this.state.pinnedPeer != undefined && element.owner?.split('/')[1] != this.state.pinnedPeer.id)) {
                                            const peerID = element.owner?.split("/")[1];
                                            const peer = props.peers.filter(peer => peer.id === peerID)[0];
                                            const customerData: any = peer.customerData;
                                            const username = customerData.username;
                                            sideVideos.push(
                                                {
                                                    username: username,
                                                    media: element,
                                                    peer: peer
                                                });
                                        }
                                    });
                                }

                                // render site content
                                return (
                                    <SWRTC.UserControls render={({ mute, unmute, isMuted, pauseVideo, resumeVideo, isPaused }) => {
                                        if (!this.state.audioActive && !isMuted) {
                                            mute();
                                        } else if (this.state.audioActive && isMuted) {
                                            unmute();
                                        }

                                        if (!this.state.videoActive && !isPaused) {
                                            pauseVideo();
                                        } else if (this.state.videoActive && isPaused) {
                                            resumeVideo();
                                        }

                                        return (
                                            <div>
                                                <RS.UserContainer>
                                                    <p>User: {this.state.username}</p>
                                                    <div>
                                                        <p>Toggle Video </p>
                                                        <ToggleButton
                                                            value={this.state.videoActive}
                                                            onToggle={this.toggleVideoMute} />
                                                    </div>
                                                    <br />
                                                    <div>
                                                        <p>Toggle Audio</p>
                                                        <ToggleButton
                                                            value={this.state.audioActive}
                                                            onToggle={this.toggleAudioMute} />
                                                    </div>
                                                </RS.UserContainer>
                                                <RS.ChatContainer>
                                                    <div>Chat</div>
                                                    {
                                                        props.room.address != undefined
                                                            ? (
                                                                <div>
                                                                    <RS.ChatMessagesContainer>
                                                                        <RS.StyledStayDownContainer>
                                                                            <SWRTC.ChatList
                                                                                room={props.room.address}
                                                                                renderGroup={({ chats, peer }) => {
                                                                                    let peerUsername: string;
                                                                                    if (peer != undefined) {
                                                                                        const custData: any = peer?.customerData;
                                                                                        peerUsername = custData.username;
                                                                                    } else {
                                                                                        peerUsername = 'Anonymous';
                                                                                    }
                                                                                    return (
                                                                                        <RS.ChatMessageGroup key={chats[0].id} chats={chats}
                                                                                            peerName={peerUsername} />
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </RS.StyledStayDownContainer>
                                                                    </RS.ChatMessagesContainer>
                                                                    <RS.ChatInputTextContainer>
                                                                        <SWRTC.ChatInput
                                                                            room={roomAddress}
                                                                            autoFocus
                                                                            sendOnEnter
                                                                            render={chatProps => (
                                                                                <div>
                                                                                    <SWRTC.ChatInputTextArea {...chatProps} />
                                                                                    <RS.DiceContainer>
                                                                                        <button onClick={() => {
                                                                                            const num = Math.floor((Math.random() * 4) + 1);
                                                                                            chatProps.updateMessage(`${num}`);
                                                                                            chatProps.sendMessage();
                                                                                        }}>D4</button>
                                                                                        <button onClick={() => {
                                                                                            const num = Math.floor((Math.random() * 6) + 1);
                                                                                            chatProps.updateMessage(`${num}`);
                                                                                            chatProps.sendMessage();
                                                                                        }}>D6</button>
                                                                                        <button onClick={() => {
                                                                                            const num = Math.floor((Math.random() * 8) + 1);
                                                                                            chatProps.updateMessage(`${num}`);
                                                                                            chatProps.sendMessage();
                                                                                        }}>D8</button>
                                                                                        <button onClick={() => {
                                                                                            const num = Math.floor((Math.random() * 10) + 1);
                                                                                            chatProps.updateMessage(`${num}`);
                                                                                            chatProps.sendMessage();
                                                                                        }}>D10</button>
                                                                                        <button onClick={() => {
                                                                                            const num = Math.floor((Math.random() * 12) + 1);
                                                                                            chatProps.updateMessage(`${num}`);
                                                                                            chatProps.sendMessage();
                                                                                        }}>D12</button>
                                                                                        <button onClick={() => {
                                                                                            const num = Math.floor((Math.random() * 20) + 1);
                                                                                            chatProps.updateMessage(`${num}`);
                                                                                            chatProps.sendMessage();
                                                                                        }}>D20</button>
                                                                                    </RS.DiceContainer>
                                                                                </div>)}
                                                                            onChat={(opt) => {
                                                                                opt.body = 'gay';
                                                                                opt.displayName = this.state.username;
                                                                            }} />
                                                                    </RS.ChatInputTextContainer>
                                                                </div>
                                                            )
                                                            : <div></div>
                                                    }

                                                </RS.ChatContainer>
                                                <RS.MainContainer>
                                                    {/* Center Video/User */}
                                                    <RS.MainVideoContainer>
                                                        {mainVideo}
                                                    </RS.MainVideoContainer>

                                                    {/* Videos/Users that are not in focus */}
                                                    {<RS.SideVideosContainer>
                                                        {
                                                            sideVideos.map((peerDetails) => {
                                                                return (
                                                                    <RS.SideVideo username={peerDetails.username}
                                                                        video={peerDetails.media}
                                                                        onclick={() => { this.setPinnedPeer(peerDetails.peer); }} />
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