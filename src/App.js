import './App.css';
import Body from './components/Body';
import { Provider } from 'react-redux';
import store from './utils/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import WatchPage from './components/WatchPage';
import SearchPage from './components/SearchPage';
import Demo from './components/Demo';

const appRouter = createBrowserRouter([{
  path: "/",
  element: <Body />,
  children: [
    {
      path: "/",
      element: <MainContainer />
    },
    {
      path: "/watch",
      element: <WatchPage />
    },
    {
      path: "/search/:query",  // Dynamic route for search
      element: <SearchPage />
    },
    {
      path: "demo",
      element: <Demo />
    }
  ]
}]);

function App() {
  return (
    <Provider store={store}>
      <div>
        <RouterProvider router={appRouter} />
        {/* <Head /> */}

{
  /*
  Head
  Body
   - Sidebar
      - MenuItems
   -MainContainer
      -ButtonList
      -VideoContainer
        -VideoCard

  */
}
      </div>
    </Provider>
    
  );
}

export default App;
