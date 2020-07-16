import styled from 'styled-components';
import React from 'react';
import { Media, Video, StayDownContainer, Chat, Peer } from '@andyet/simplewebrtc';

export const Container = styled.div({
    width: '100%',
    color: '#e9ecec'
});

export const UserContainer = styled.div({
    padding: '5px',
    width: '15%',
    backgroundColor: '#333333',
    position: 'absolute',
    top: '7%',
    left: '1%',
    bottom: '71%'
});

export const ChatContainer = styled.div({
    padding: '5px',
    width: '15%',
    marginTop: '10px',
    backgroundColor: '#555555',
    position: 'absolute',
    top: '30%',
    left: '1%',
    bottom: '2%'
});

export const MainContainer = styled.div({
    position: 'absolute',
    left: '17%',
    top: '7%',
    right: '1%',
    bottom: '2%',
});

export const MainVideoContainer = styled.div({
    position: 'absolute',
    width: '100%',
    height: '100%',
    maxHeight: 'calc(var(--vh, 1vh) * 100)',
    border: 'solid',
    borderColor: '#111111',
    '& video': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    zIndex: -101,
});

export const LoadingState = styled.div({
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 0%',
    justifyContent: 'center',
    position: 'relative'
});

export const UsernameContainer = styled.h1({
    textAlign: 'center',
    width: '100%',
    position: 'absolute',
    top: '45%',
});


export const SideVideosContainer = styled.div({
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    height: '13%',
    paddingRight: '10px',
    paddingLeft: '10px',
});

export const SidePeerContainer = styled.div({
    width: '10%',
    marginTop: '10px',
    marginBottom: '10px',
    padding: '3px',
    display: 'grid',
});

export const SideVideoContainer = styled.div({
    width: '100%',
    height: '100%',
    maxHeight: 'calc(var(--vh, 1vh) * 100)',
    gridColumn: 1,
    gridRow: 1,
    border: 'solid',
    borderColor: '#000000',
    backgroundColor: '#111111',
    '& video': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },

    '&:hover': {
        opacity: 0
    },
});

export const SideVideoExtraContent = styled.div({
    textAlign: 'center',
    margin: 'auto',
    width: '100%',
    height: '100%',
    paddingTop: '30%',
    gridColumn: 1,
    gridRow: 1,
    paddingLeft: '20px',
    paddingRight: '20px',
    backgroundColor: '#111111',
});

interface Props {
    onclick: () => void;
    username: string;
    video: Media;
}
export class SideVideo extends React.Component<Props> {
    render() {
        return (
            <SidePeerContainer onClick={this.props.onclick}>
                <SideVideoExtraContent>
                    <p>{this.props.username}</p>
                </SideVideoExtraContent>
                <SideVideoContainer>
                    {
                        this.props.video == undefined
                            ? <div></div>
                            : <Video media={this.props.video} qualityProfile={'low'} />
                    }
                </SideVideoContainer>
            </SidePeerContainer >
        );
    }
}

export const StyledStayDownContainer = styled(StayDownContainer)({
    flex: 1,
    overflowY: 'hidden',
    overflowX: 'hidden',
    height: '0px',
});

const Message = styled.div({
    borderBottom: '1px solid',
    position: 'relative',
    padding: '10px',
    fontSize: '14px',
    '& p': {
        margin: 0
    },
});

const MessageAuthor = styled.p({
    fontWeight: 'bold'
});

const MessageTime = styled.span({
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: '#FFFFFF',
    fontSize: '12px'
});

const MessageText = styled.p({
    wordBreak: 'break-all'
});

export const ChatMessagesContainer = styled.div`
    position: absolute;
    top: 5%;
    bottom: 20%;
    width: 95%;
    left: 2.5%;
    display: flex;
    flex-direction: column;
    min-height: calc(var(--vh, 1vh) * 55);
    max-height: calc(var(--vh, 1vh) * 55);
    border-top: 1px solid;
    z-index: 300;
    background-color: #222222;
    overflow: hidden;

    & .msg:last-of-type {
      border-bottom: none;
    }
    border-top: none;
`;

export const DiceContainer = styled.div({
    position: 'absolute',
    top: '88.5%',
    bottom: '7%',
    left: '2.5%',
    width: '90%',
});

interface ChatMessageGroupProps {
    chats: Chat[];
    peerName: string;
}
export const ChatMessageGroup: React.SFC<ChatMessageGroupProps> = ({ chats, peerName }) => (
    <Message className="msg" key={chats[0].id}>
        <MessageAuthor>{peerName}</MessageAuthor>
        <MessageTime>{chats[0].time.toLocaleTimeString()}</MessageTime>
        {chats.map(message => (
            <MessageText key={message.id}>
                <span key={message.body}>{message.body}</span>
            </MessageText>
        ))}
    </Message>
);

export const ChatInputTextContainer = styled.div({
    width: '100%',
    '& textarea': {
        position: 'absolute',
        left: '2.5%',
        bottom: '1%',
        marginTop: '15px',
        height: '30px',
        width: '95%',
        resize: 'none'
    },
});