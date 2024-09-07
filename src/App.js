import "./App.css";
import CharacterSheetWrapper from "./CharacterSheet";
import useAppContext from "./hooks/useAppContext";

function App() {
  const { handleSaveAllData, addCharacter, characters } = useAppContext();
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
            gap: "20px",
          }}
        >
          <button onClick={addCharacter}>Add Character</button>
          <button onClick={handleSaveAllData}>Save All Data</button>
        </div>
        {characters.map((character) => (
          <CharacterSheetWrapper key={character} character={character} />
        ))}
        {/*<CharacterSheetWrapper character={"character1"} />*/}
      </section>
    </div>
  );
}
export default App;
