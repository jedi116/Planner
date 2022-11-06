export interface Goals {
    title: string;
    description: string;
    type: 'short term' | 'long term';
    uid: string;
    progress: number;
}