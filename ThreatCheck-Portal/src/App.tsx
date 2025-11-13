import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./assets/components/layout/header/Header";
import NavBar from "./assets/components/layout/navbar/NavBar";
import Sprawdzanie from "./pages/Sprawdzanie/Sprawdzanie";
import Wynik from "./pages/Wynik/Wynik";
import Eksport from "./pages/Eksport/Eksport";
import Konfiguracja from "./pages/Ustawienia/Ustawienia";

function App() {
  return (
    <div className={styles.App}>

      <header className={styles.topContainer}>
        <Header />
        <NavBar />
      </header>

      <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Sprawdzanie />} />
            <Route path="/sprawdzanie" element={<Sprawdzanie />} />
            <Route path="/eksport" element={<Eksport />} />
            <Route path="/wynik" element={<Wynik />} />
            <Route path="/konfiguracja" element={<Konfiguracja />} />
          </Routes>
      </main>

    </div>
  )
}

export default App;