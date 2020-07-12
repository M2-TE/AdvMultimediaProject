export interface Config {
    roomName: string;
    roomPassword: string;
    videoActive: boolean;
    audioActive: boolean;
}

export const config = {
    roomName: '',
    roomPassword: '',
    videoActive: true,
    audioActive: true
};