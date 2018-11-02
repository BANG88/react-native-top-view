/*
 *
 * Top View
 *
 */

import React, { isValidElement, ReactElement } from "react";
import { NativeEventEmitter, AppRegistry, View } from "react-native";
export interface TopViewProps {
  children?: React.ReactNode;
}
export interface TopViewState {
  element: React.ReactNode;
}
// events
const addType = "RN_PREFIX_ADDTOPVIEW";
const removeType = "RN_PREFIX_REMOVETOPVIEW";
// Component Placeholder
export class TopView extends React.Component<TopViewProps, TopViewState> {
  state: TopViewState = {
    element: null
  };
  componentDidMount() {
    NativeEventEmitter.addListener(addType, this.addTopView);
    NativeEventEmitter.addListener(removeType, this.removeTopView);
  }
  componentWillUnmount() {
    NativeEventEmitter.removeListener(addType, this.addTopView);
    NativeEventEmitter.removeListener(removeType, this.removeTopView);
  }
  removeTopView = () => {
    this.setState({ element: null });
  };
  addTopView = (e: any) => {
    if (isValidElement(e)) {
      this.setState({ element: e });
    } else {
      // tslint:disable-next-line:no-console
      console.error("element must be valid react elment!");
    }
  };
  render() {
    return this.state.element;
  }
}

/**
 * setup topview
 */
export const setupTopView = () => {
  const withRoot = (Node: React.ReactType) => {
    return class extends React.Component {
      render() {
        return (
          <View style={{ flex: 1 }}>
            <Node {...this.props} />
            <TopView />
          </View>
        );
      }
    };
  };
  //  * copy of original registerComponent
  const originalRegisterComponent = AppRegistry.registerComponent;

  AppRegistry.registerComponent = (appKey, componentProvider) => {
    return originalRegisterComponent(appKey, () => {
      return withRoot(componentProvider());
    });
  };
};
/**
 * set top view
 * @param e
 */
export const set = (e: React.ReactNode) => NativeEventEmitter.emit(addType, e);
/**
 * unset top view
 */
export const remove = () => NativeEventEmitter.emit(removeType);

export default { set, remove };
