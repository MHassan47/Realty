import { Provider } from "react-redux";
import { store } from "./redux/store";
import Routes from "./Routes";

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
