export interface LimitInfo {
    label: string;
    timeLimit: number;
}
export interface Limit {
    [key: string]: LimitInfo
}

export const LIMIT: Limit = {
    UNLIMITED: { label: 'Unlimited', timeLimit: Infinity },
    T3: { label: '3 seconds', timeLimit: 3 },
    T5: { label: '5 seconds', timeLimit: 5 },
    T10: { label: '10 seconds', timeLimit: 10 },
    T20: { label: '20 seconds', timeLimit: 20 },
    T40: { label: '40 seconds', timeLimit: 40 },
    T60: { label: '60 seconds', timeLimit: 60 }
};

export enum GRID {
    G10 = 10,
    G15 = 15,
    G20 = 20,
    G30 = 30,
    G40 = 40,
}

export enum SYMBOL {
    CROSS,
    CIRCLE
}

export enum PLAYER {
    PLAYER1,
    PLAYER2
}