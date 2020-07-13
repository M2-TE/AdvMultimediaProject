import { Media, Video, Audio } from '@andyet/simplewebrtc';
import React from 'react';
import styled from 'styled-components';
import { ProgressPlugin } from 'webpack';

const VideoContainer = styled.div({
    width: '100%',
    height: '450px',
    position: 'relative',
    padding: '0',
    margin: '0',
    display: 'flex',
    justifyContent: 'center',
    border: 'solid',

    '& video': {
        width: '100%',
        height: '100%',
        background: '#000000',
        objectFit: 'contain',
    },
});

const BlankVideo = styled.div({
    width: '100%',
    height: '450px',
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

interface Props {
    video?: Media;
    audio?: Media;
    toggleVideo: any;
    toggleAudio: any;
}
interface State {
    usernameInput: string;
}
class MediaPreview extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            usernameInput: ''
        };
    }

    handleUsernameInput(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        this.setState((state) => ({
            usernameInput: event.target.value
        }));
    }

    // enter room with given input data
    handleClick() {
        console.log(this.state.usernameInput);
    }

    render() {
        return (
            <FullContainer>
                <SubContainer>
                    <VideoContainer>
                        {
                            this.props.video && this.props.video.loaded
                                ? <Video media={this.props.video} />
                                : <BlankVideo> <p>No video selected</p> </BlankVideo>
                        }
                    </VideoContainer>
                </SubContainer>
                <SubContainer>
                    <div>
                        <button onClick={this.props.toggleVideo}> Toggle Video </button>
                        <button onClick={this.props.toggleAudio}> ToggleAudio </button>
                        <input type="text" placeholder={"Username"} autoFocus={true} onChange={this.handleUsernameInput} />
                        <input
                            type="button"
                            value="Enter Room"
                            onClick={this.handleClick}
                        />
                    </div>
                </SubContainer>
            </FullContainer>
        );
    }
}
// const MediaPreview: React.SFC<MediaPreviewProps> = ({ video, toggleVideo, toggleAudio }) => (
//     <FullContainer>
//         <SubContainer>
//             <VideoContainer>
//                 {
//                     video && video.loaded
//                         ? <Video media={video} />
//                         : <BlankVideo> <p>No video selected</p> </BlankVideo>
//                 }
//             </VideoContainer>
//         </SubContainer>
//         <SubContainer>
//             <button onClick={toggleVideo}> Toggle Video </button>
//             <button onClick={toggleAudio}> ToggleAudio </button>
//             <input type="text" onChange={this.handleChange} />
//             <input
//                 type="button"
//                 value="Alert the text input"
//                 onClick={this.handleClick}
//             />
//         </SubContainer>
//     </FullContainer>
// );

export default MediaPreview;
