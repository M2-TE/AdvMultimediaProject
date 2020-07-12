import { Provider } from 'react-redux';
import React from 'react';
import * as SWRTC from '@andyet/simplewebrtc';

import MediaPreview from './components/MediaPreview';
import { Config, config } from './Config';

// create store on init
const store = SWRTC.createStore();
const configUrl = 'https://api.simplewebrtc.com/config/guest/413edda4665ecafd9710bee2';

interface Props {
    roomName: string;
    password?: string;
    name?: string;
};
export default class App extends React.Component<Props, Config> {
    // constructor to initialize app
    constructor(props: Props) {
        super(props);

        config.roomName = this.props.name == null ? 'Anonymous' : this.props.name;;
        config.roomPassword = this.props.password == null ? '' : this.props.password;
        this.state = config;
        this.toggleVideoActive = this.toggleVideoActive.bind(this);
        this.toggleAudioActive = this.toggleAudioActive.bind(this);

    }

    toggleVideoActive() {
        console.log('video toggled');
        this.setState({
            roomName: this.state.roomName,
            roomPassword: this.state.roomPassword,
            videoActive: !this.state.videoActive,
            audioActive: this.state.audioActive
        });
    }
    toggleAudioActive() {
        this.setState({
            roomName: this.state.roomName,
            roomPassword: this.state.roomPassword,
            videoActive: this.state.videoActive,
            audioActive: !this.state.audioActive
        });
    }

    render() {
        console.log('Rendering entire app.')
        return (
            <Provider store={store} >
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
                        <SWRTC.Room name={this.props.roomName} password={this.props.password}>
                            {props => {
                                return (
                                    <MediaPreview video={this.state.videoActive ? props.localMedia[1] : undefined} toggleVideo={this.toggleVideoActive} toggleAudio={this.toggleAudioActive} />
                                );
                            }}
                        </SWRTC.Room>
                    </SWRTC.Connected>
                </SWRTC.Provider>
            </Provider>
        );
    }
}
