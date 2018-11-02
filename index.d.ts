import React from "react";
export interface TopViewProps {
    children?: React.ReactNode;
}
export interface TopViewState {
    element: React.ReactNode;
}
export declare class TopView extends React.Component<TopViewProps, TopViewState> {
    state: TopViewState;
    componentDidMount(): void;
    componentWillUnmount(): void;
    removeTopView: () => void;
    addTopView: (e: any) => void;
    render(): React.ReactNode;
}
/**
 * set top view
 * @param e
 */
export declare const set: (e: React.ReactNode) => void;
/**
 * unset top view
 */
export declare const remove: () => void;
declare const _default: {
    set: (e: React.ReactNode) => void;
    remove: () => void;
};
export default _default;
