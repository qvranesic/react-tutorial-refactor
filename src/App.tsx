import { GameFrame } from "./components/GameFrame";
import { GameProvider } from "./contexts/Game";

const App = () => (
  <GameProvider>
    <GameFrame />
  </GameProvider>
);

export default App;
