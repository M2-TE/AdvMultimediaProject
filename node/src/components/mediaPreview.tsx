import { Media, Video } from '@andyet/simplewebrtc';
import React from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div({
    width: '100%',
    position: 'relative',
    padding: '0',
    margin: '0',
    display: 'flex',
    justifyContent: 'center',
    border: 'solid',

    '& video': {
        width: '100%',
        objectFit: 'contain',
    },
});

const BlankVideo = styled.div({
    width: '100%',
    height: '300px',
    backgroundColor: '#262a2c',
    color: '#e9ecec',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& p': {
        margin: 0
    }
});

const FullContainer = styled.div({
    width: '100%',
    minHeight: '300px',
    display: 'flex',
    marginTop: '100px',
    justifyContent: 'center',
});

const SubContainer = styled.div({
    width: '50%',
    backgroundColor: '#262a2c',
});

interface MediaPreviewProps {
    video?: Media;
    toggleVideo: any;
    toggleAudio: any;
}

function onclick() {
    // config.videoSettings.data1 = 'ASDASD';
}

const MediaPreview: React.SFC<MediaPreviewProps> = ({ video, toggleVideo, toggleAudio }) => (
    <FullContainer>
        <SubContainer>
            <VideoContainer>
                {
                    video && video.loaded
                        ? <Video media={video} />
                        : <BlankVideo> <p>No video selected</p> </BlankVideo>
                }
            </VideoContainer>
        </SubContainer>
        <SubContainer>
            <button onClick={toggleVideo}>
                CLICK ME
            </button>
        </SubContainer>
    </FullContainer>
);

export default MediaPreview;
