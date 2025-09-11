import styles from "./App.module.css";
import Header from './assets/components/layout/header/Header'
import NavBar from "./assets/components/layout/navbar/NavBar";

function App() {
  return (
    <div className={styles.App}>

      <div className={styles.topContainer}>
        <Header />
        <NavBar />
      </div>

      <main>
        {/* Your pages/components will go here */} 
      </main>
      
    </div>
  )
}

export default App;
