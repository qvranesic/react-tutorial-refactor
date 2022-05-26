import { GameFrame } from "./components/GameFrame";
import { GameProvider } from "./contexts/Game";

const App = () => (
  <GameProvider onUpdate={console.log}>
    <GameFrame />
  </GameProvider>
);

export default App;
