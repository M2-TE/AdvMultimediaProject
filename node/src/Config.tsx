export interface Config {
    name: string;
    roomName: string;
    roomPassword: string;
    videoActive: boolean;
    audioActive: boolean;
}

export const config = {
    name: 'Anonymous',
    roomName: '',
    roomPassword: '',
    videoActive: true,
    audioActive: true
};