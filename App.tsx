import { Provider } from "react-redux";
import { store } from "./redux/store";
import Routes from "./Routes";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Warning: Async Storage has been extracted from react-native core",
]);
export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
