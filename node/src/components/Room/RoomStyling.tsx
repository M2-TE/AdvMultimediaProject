import styled from 'styled-components';

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
    bottom: '61%'
});

export const ChatContainer = styled.div({
    padding: '5px',
    width: '15%',
    marginTop: '10px',
    backgroundColor: '#555555',
    position: 'absolute',
    top: '40%',
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
    paddingTop: '10%',
    gridColumn: 1,
    gridRow: 1,
    paddingLeft: '20px',
    paddingRight: '20px',
    backgroundColor: '#111111',
});