import { Provider } from 'react-redux';
import React from 'react';
import * as SWRTC from '@andyet/simplewebrtc';

import PreviewRoom from './components/Preview/PreviewRoom';
import Room from './components/Room';

// create store on init
const store = SWRTC.createStore();

interface Props {
    roomName: string;
    password?: string;
    name?: string;
};
interface State {
    roomEntered: boolean;
    username: string;
    roomName: string;
    roomPassword: string;
    videoActive: boolean;
    audioActive: boolean;
}
export default class App extends React.Component<Props, State> {
    // constructor to initialize app
    constructor(props: Props) {
        super(props);

        this.enterRoom = this.enterRoom.bind(this);

        this.state = {
            roomEntered: true,
            username: 'Anonymous',
            roomName: this.props.roomName,
            roomPassword: '',
            videoActive: true,
            audioActive: true
        };
    }

    enterRoom(audioActive: boolean, videoActive: boolean, username: string) {
        this.setState((state) => ({
            roomEntered: true,
            username: username == "" ? state.username : username,
            roomName: state.roomName,
            roomPassword: state.roomPassword,
            videoActive: videoActive,
            audioActive: audioActive
        }));
    }

    render() {
        console.log('Rendering entire app.')
        return (
            <Provider store={store}>
                {
                    // send user either to the preview room or the actual webrtc room
                    this.state.roomEntered
                        ? (<Room roomName={this.state.roomName}
                            roomPassword={this.state.roomPassword}
                            username={this.state.username}
                            audioActive={this.state.audioActive}
                            videoActive={this.state.videoActive}>
                        </Room>)
                        : (<PreviewRoom enterRoom={this.enterRoom}>

                        </PreviewRoom>)
                }
            </Provider>
        );
    }
}
