export type RoomsT = {
    _id: number;
    name: string;
    password?: string;
    __v?: number;
    participants?: string[]
    messages?: messageT[]
}
export type messageT = {
    from: string;
    text: string
}