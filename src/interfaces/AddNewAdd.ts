export interface addAdds {
    onOpen: boolean,
    onClos: () => void,
    roomData: object[] | null,
    fetchAds: ()=> void
}
export interface addAddsData {
    room: string,
    isActive: boolean,
    discount: number
}