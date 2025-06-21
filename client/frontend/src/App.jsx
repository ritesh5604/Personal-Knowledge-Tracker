import ConceptsList from "./components/ConceptsList";

function App() {
  return (
    <div>
      <header style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>Knowledge Tracker</h1>
      </header>
      <main>
        <ConceptsList />
      </main>
    </div>
  );
}

export default App;
