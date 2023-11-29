import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { AppStateProvider } from './redux/index';

const Root = () => {
    return (
        <AppStateProvider>
            <App />
        </AppStateProvider>
    );
};

AppRegistry.registerComponent(appName, () => Root);