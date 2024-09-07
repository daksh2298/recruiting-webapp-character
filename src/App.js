import "./App.css";
import CharacterSheetWrapper from "./CharacterSheet";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <CharacterSheetWrapper character={"character1"} />
      </section>
    </div>
  );
}
export default App;
