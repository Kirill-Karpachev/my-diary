import Diary from "../diary/diary";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./app.module.css";

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Diary />
      <Footer />
    </div>
  );
};

export default App;
