import { Provider } from 'react-redux';
import React from 'react';
import * as SWRTC from '@andyet/simplewebrtc';

import { Config, config } from './Config';
import PreviewRoom from './PreviewRoom';
import MediaPreview from './components/MediaPreview';
import Room from './Room';

// create store on init
const store = SWRTC.createStore();

const roomEntered = false;

interface Props {
    roomName: string;
    password?: string;
    name?: string;
};
export default class App extends React.Component<Props, Config> {
    // constructor to initialize app
    constructor(props: Props) {
        super(props);

        config.roomName = this.props.roomName;
        config.name = this.props.name == null ? 'Anonymous' : this.props.name;
        config.roomPassword = this.props.password == null ? '' : this.props.password;
        this.state = config;
    }

    enterRoom(audioActive: boolean, videoActive: boolean, username: string) {
        this.setState((state) => ({

        }));
    }

    render() {
        console.log('Rendering entire app.')
        return (
            <Provider store={store}>
                {
                    // send user either to the preview room or the actual webrtc room
                    roomEntered
                        ? (<Room roomName={config.roomName}
                            roomPassword={config.roomPassword}
                            name={'peep'}
                            audioActive={this.state.audioActive}
                            videoActive={this.state.videoActive}>

                        </Room>)
                        : (<PreviewRoom store={store}>

                        </PreviewRoom>)
                }
            </Provider>
        );
    }
}
