import "./App.css";
import MovieTable from "./modules/movieTable";
import Counters from "./modules/counters";

function App() {
  return (
    <main className="container">
      <MovieTable />
      <Counters />
    </main>
  );
}

export default App;
