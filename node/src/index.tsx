import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as SWRTC from '@andyet/simplewebrtc';

import styled, { css } from 'styled-components';
import MediaPreview from './components/mediaPreview';

const API_KEY = '413edda4665ecafd9710bee2';
const ROOM_NAME = 'derp';
const ROOM_PASSWORD = '';
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${API_KEY}`;

const store = SWRTC.createStore();

const Preview = styled.div({
    gridArea: 'preview',
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column'
});

interface RunParams {
    roomName: string;
}

const run = ({
    roomName
}: RunParams) => {
    ReactDOM.render(
        <Provider store={store}>
            <SWRTC.Provider configUrl={CONFIG_URL}>
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
                    <SWRTC.Room name={roomName} password={ROOM_PASSWORD}>
                        {props => {

                            // console.log(props);
                            return (
                                <Preview>
                                    <MediaPreview video={props.localMedia[1]} />
                                    <MediaPreview video={props.remoteMedia[1]} />
                                </Preview>
                            );
                        }}
                    </SWRTC.Room>
                </SWRTC.Connected>
            </SWRTC.Provider>
        </Provider>,
        document.getElementById('app')
    );
}

export default {
    run
};