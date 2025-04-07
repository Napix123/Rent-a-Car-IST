import NaruciHome from "./MiniKomponente/NaruciHome";
import Najpopularnije from "./MiniKomponente/Najpopularnije";
const App = () => {
  return (
    <>
      <div className="sadrzaj">
        <NaruciHome />
        <Najpopularnije />
      </div>
    </>
  );
};

export default App;
