import { Media, Video, VolumeMeter } from '@andyet/simplewebrtc';
import React from 'react';
import styled from 'styled-components';
import { default as Meter } from './VolumeMeter';
import ToggleButton from 'react-toggle-button';

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
    padding: '5px',
    width: '50%',
    backgroundColor: '#262a2c',
});

const Volume = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'middle',
    marginTop: '5px'
});

const EnableDisableParent = styled.div({
    marginTop: '5px',
    marginBottom: '5px',
    padding: '5px',
    color: '#e9ecec',
    backgroundColor: '#222222',
    display: 'flex',
    justifyContent: 'space-between'
});

const EnableDisable = styled.div({
    margin: '5px',
    display: 'flex',
    justifyContent: 'start'
});

const EnabledDescriptor = styled.div({
    marginRight: '5px'
});

interface Props {
    enterRoom: any;
    video?: Media;
    audio?: Media;
}
interface State {
    usernameInput: string;
    videoEnabled: boolean;
    audioEnabled: boolean;
}
class MediaPreview extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.toggleAudio = this.toggleAudio.bind(this);
        this.toggleVideo = this.toggleVideo.bind(this);

        this.state = {
            usernameInput: '',
            videoEnabled: true,
            audioEnabled: true
        };
    }

    handleUsernameInput(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        this.setState((state) => ({
            usernameInput: event.target.value,
            videoEnabled: state.videoEnabled,
            audioEnabled: state.audioEnabled
        }));
    }

    // enter room with given input data
    handleClick() {
        this.props.enterRoom(
            this.state.audioEnabled,
            this.state.videoEnabled,
            this.state.usernameInput);
    }

    toggleAudio() {
        this.setState((state) => ({
            usernameInput: state.usernameInput,
            videoEnabled: state.videoEnabled,
            audioEnabled: !state.audioEnabled
        }));
    }
    toggleVideo() {
        this.setState((state) => ({
            usernameInput: state.usernameInput,
            videoEnabled: !state.videoEnabled,
            audioEnabled: state.audioEnabled
        }));
    }

    render() {
        return (
            <FullContainer className={"container"}>
                <SubContainer>
                    <VideoContainer>
                        {
                            this.props.video && this.props.video.loaded && this.state.videoEnabled
                                ? <Video media={this.props.video} />
                                : <BlankVideo> <p>No video selected</p> </BlankVideo>
                        }
                    </VideoContainer>

                    <div>
                        {
                            this.props.audio && this.state.audioEnabled
                                ? <VolumeMeter
                                    media={this.props.audio}
                                    noInputTimeout={7000}
                                    render={({ noInput, volume, speaking }) => (
                                        <Volume>
                                            <Meter
                                                buckets={16}
                                                volume={-volume}
                                                speaking={true}
                                                loaded={true}
                                                noInput={noInput}
                                                requesting={false}
                                            />
                                        </Volume>
                                    )}
                                />
                                : <div></div>
                        }
                    </div>
                </SubContainer>
                <SubContainer>
                    <div>
                        <EnableDisableParent>
                            <EnableDisable>
                                <EnabledDescriptor><span>Audio Enabled:</span></EnabledDescriptor>
                                <ToggleButton
                                    value={this.state.audioEnabled || false}
                                    onToggle={this.toggleAudio} />
                            </EnableDisable>
                            <EnableDisable>
                                <EnabledDescriptor><span>Video Enabled:</span></EnabledDescriptor>
                                <ToggleButton
                                    value={this.state.videoEnabled || false}
                                    onToggle={this.toggleVideo} />
                            </EnableDisable>
                        </EnableDisableParent>
                        <div>
                            <input type="text"
                                className={"border-dark form-control"}
                                required={true} placeholder={"Username"}
                                autoFocus={true} onChange={this.handleUsernameInput} />
                            <input
                                className={"btn btn-dark btn-block btn-lg"}
                                type="button"
                                value="Enter Room"
                                onClick={this.handleClick}
                            />
                        </div>
                    </div>
                </SubContainer>
            </FullContainer >
        );
    }
}
export default MediaPreview;
