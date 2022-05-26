import { GameFrame } from "./components/GameFrame";
import { GameProvider } from "./contexts/Game";

const App = () => (
  <GameProvider firstSquareValue="X">
    <GameFrame />
  </GameProvider>
);

export default App;
