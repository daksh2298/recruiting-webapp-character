import "./App.css";
import CharacterSheetWrapper from "./CharacterSheet";
import useAppContext from "./hooks/useAppContext";

function App() {
  const { handleSaveAllData } = useAppContext();
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise - Daksh Patel</h1>
      </header>
      <section className="App-section">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            margin: "20px",
          }}
        >
          <button onClick={handleSaveAllData}>Save All Data</button>
        </div>
        <CharacterSheetWrapper character={"character1"} />
      </section>
    </div>
  );
}
export default App;
