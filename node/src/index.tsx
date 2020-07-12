import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

interface RunParams {
    roomName: string;
    password?: string;
    name?: string;
}

const run = ({
    roomName
}: RunParams) => {
    ReactDOM.render(
        <App roomName={roomName} />,
        document.getElementById('app')
    );
}

export default {
    run
};