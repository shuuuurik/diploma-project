import { useState } from "react";
import Accordion from "./components/Accordion";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./css/App.css";
import { ITrack } from "./interfaces";
import { CurrentTrackContext, initialTrack } from "./currentTrackContext"

/**
 * Компонент для отображения приложения целиком
 * @component
*/
function App() {
  const [searchValue, setSearchValue] = useState('');

  const [track, setTrack] = useState({
    track: initialTrack,
    changeTrack(newTrack: ITrack) {
       setTrack((trackObj) => {
          return { ...trackObj, track: newTrack };
       });
    }
  });

    return (
      <div className="app">
        <Header searchValue={searchValue} onSearchCallback={setSearchValue} />
        <Accordion />
        <CurrentTrackContext.Provider value={track}>
          <Content searchValue={searchValue} />
          <Footer />
        </CurrentTrackContext.Provider>
      </div>
    );
}

 export default App;
