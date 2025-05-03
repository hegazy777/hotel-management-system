import { ReactNode } from "react";

export interface DetailsInterFace {
    open: boolean;
    onClose: ()=> void;
    AddDetails: ReactNode;
    loaderState: boolean

} 