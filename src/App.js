import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainMenuUI from "./components/MainMenuUI";
import GameModeUI from "./components/GameModeUI";
import ChessUI from "./components/ChessUI";
import HelpTutorialMenuUI from "./components/HelpTutorialMenuUI";
import LeaderboardUI from "./components/LeaderboardUI";
import SettingsUI from "./components/SettingsUI";
import CustomPuzzlesUI from "./components/CustomPuzzlesUI";
import LoginUI from "./components/LoginUI";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MainMenuUI} />
          <Route path="/gamemode" component={GameModeUI} />
          <Route path="/chess" component={ChessUI} />
          <Route path="/help-tutorial" component={HelpTutorialMenuUI} />
          <Route path="/leaderboard" component={LeaderboardUI} />
          <Route path="/settings" component={SettingsUI} />
          <Route path="/custom-puzzles" component={CustomPuzzlesUI} />
          <Route path="/login" component={LoginUI} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;