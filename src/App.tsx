import React from 'react';
import Map from './Components/Map';
import GlobalProvider from './Context/GlobalProvider';

const App: React.FC = () => {

  return (
    <GlobalProvider>
      <Map/>
    </GlobalProvider>
  );
}

export default App;
