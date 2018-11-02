"use strict";
/*
 *
 * Top View
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
// events
var addType = "RN_PREFIX_ADDTOPVIEW";
var removeType = "RN_PREFIX_REMOVETOPVIEW";
// fix react native web does not support DeviceEventEmitter
var TopViewEventEmitter = react_native_1.NativeEventEmitter || react_native_1.DeviceEventEmitter;
// Component Placeholder
var TopView = /** @class */ (function (_super) {
    __extends(TopView, _super);
    function TopView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            element: null
        };
        _this.removeTopView = function () {
            _this.setState({ element: null });
        };
        _this.addTopView = function (e) {
            if (react_1.isValidElement(e)) {
                _this.setState({ element: e });
            }
            else {
                // tslint:disable-next-line:no-console
                console.error("element must be valid react elment!");
            }
        };
        return _this;
    }
    TopView.prototype.componentDidMount = function () {
        TopViewEventEmitter.addListener(addType, this.addTopView);
        TopViewEventEmitter.addListener(removeType, this.removeTopView);
    };
    TopView.prototype.componentWillUnmount = function () {
        TopViewEventEmitter.removeListener(addType, this.addTopView);
        TopViewEventEmitter.removeListener(removeType, this.removeTopView);
    };
    TopView.prototype.render = function () {
        return this.state.element;
    };
    return TopView;
}(react_1.default.Component));
exports.TopView = TopView;
var withRoot = function (Node) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.render = function () {
            return (react_1.default.createElement(react_native_1.View, { style: { flex: 1 } },
                react_1.default.createElement(Node, __assign({}, this.props)),
                react_1.default.createElement(TopView, null)));
        };
        return class_1;
    }(react_1.default.Component));
};
//  * copy of original registerComponent
var originalRegisterComponent = react_native_1.AppRegistry.registerComponent;
react_native_1.AppRegistry.registerComponent = function (appKey, componentProvider) {
    return originalRegisterComponent(appKey, function () {
        return withRoot(componentProvider());
    });
};
/**
 * set top view
 * @param e
 */
exports.set = function (e) { return react_native_1.NativeEventEmitter.emit(addType, e); };
/**
 * unset top view
 */
exports.remove = function () { return react_native_1.NativeEventEmitter.emit(removeType); };
exports.default = { set: exports.set, remove: exports.remove };
