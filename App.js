/** @format */

import React from "react";
import { Image, SafeAreaView } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import reducers from "@redux/reducers";
import thunk from "redux-thunk";
import {
  Images,
  Constants,
  warn,
  connectConsoleToReactotron,
  Config
} from "@common";
import Reactotron from "reactotron-react-native";
import AuthWorker from "@services/UserModal";
import RootRouter from "./App/RootRouter";
import "./ReactotronConfig";
import { Style } from "./App/Common";

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

const ADUNITID = `ca-app-pub-1425926517331745~6816357585`;
const BANNER_ID = `ca-app-pub-1425926517331745/4139536433`;
const INTERSTITIAL_ID = `ca-app-pub-1425926517331745/1141181467`;
const REWARDED_ID = `ca-app-pub-1425926517331745/3923257478`;

AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID);
AdMobInterstitial.setTestDeviceID("EMULATOR");
AdMobRewarded.setAdUnitID(REWARDED_ID);
AdMobRewarded.setTestDeviceID("EMULATOR");
console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appIsReady: false
    };
  }

  async loadAssets() {
    const imageAssets = cacheImages([Images.logo]);

    const fontAssets = cacheFonts([
      { OpenSans: require("@assets/fonts/OpenSans-Regular.ttf") },
      { Volkhov: require("@assets/fonts/Volkhov-Regular.ttf") }
    ]);
    await Promise.all([...fontAssets, ...imageAssets]);
  }

  _openInterstitial = async () => {
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  };

  _openRewarded = async () => {
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  };

  componentDidMount() {
    this._openInterstitial();
  }

  render() {
    let store = null;
    if (__DEV__) {
      if (Constants.useReactotron) {
        store = Reactotron.createStore(reducers, {}, applyMiddleware(thunk));
        connectConsoleToReactotron();
      } else {
        const composeEnhancers =
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        store = composeEnhancers(applyMiddleware(thunk))(createStore)(reducers);

        if (module.hot) {
          // Enable Webpack hot module replacement for reducers
          module.hot.accept(reducers, () => {
            const nextRootReducer = reducers;
            store.replaceReducer(nextRootReducer);
          });
        }

        // show network react-native-debugger
        // only show on IOS, android bug
        // if (Platform.OS === 'ios') {
        // global.XMLHttpRequest = global.originalXMLHttpRequest
        //   ? global.originalXMLHttpRequest
        //   : global.XMLHttpRequest;
        // global.FormData = global.originalFormData
        //   ? global.originalFormData
        //   : global.FormData;
        // }
      }
    } else {
      store = compose(applyMiddleware(thunk))(createStore)(reducers);
    }

    const persistor = persistStore(store);

    // if (!this.state.appIsReady) {
    //   return (
    //     <AppLoading
    //       startAsync={this.loadAssets}
    //       onFinish={() => this.setState({ appIsReady: true })}
    //       onError={console.warn("error")}
    //     />
    //   );

    return (
      <SafeAreaView style={Style.container}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <RootRouter />
          </PersistGate>
        </Provider>
      </SafeAreaView>
    );
  }
}
