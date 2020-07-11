import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as SWRTC from '@andyet/simplewebrtc';

const API_KEY = '413edda4665ecafd9710bee2';
const ROOM_NAME = 'derp';
const ROOM_PASSWORD = '';
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${API_KEY}`;

const store = SWRTC.createStore();

if (document.getElementById('app') != null) {
    console.log('app found');
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
                    <SWRTC.Room name={ROOM_NAME} password={ROOM_PASSWORD}>
                        {props => {

                            return <h1 className="border rounded-0 mb-5" style={{ color: "white", filter: "blur(0px)" }}>
                                Create your own chat room to play your favorite boardgames over the internet with tools like the
                                DICE
                                    </h1>
                        }}
                    </SWRTC.Room>
                </SWRTC.Connected>
            </SWRTC.Provider>
        </Provider>,
        document.getElementById('app')
    );
} else {
    console.log('no app found');
}