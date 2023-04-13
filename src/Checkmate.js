import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React from "react";
import MainMenuUI from "./components/MainMenuUI";
import GameModeUI from "./components/GameModeUI";
import ClassicalUI from "./components/ClassicalUI";
import BulletUI from "./components/BulletUI";
import HelpTutorialMenuUI from "./components/HelpTutorialMenuUI";
import LeaderboardUI from "./components/LeaderboardUI";
import SettingsUI from "./components/SettingsUI";
import CustomPuzzlesUI from "./components/CustomPuzzlesUI";
import LoginUI from "./components/LoginUI";
import PlayUI from "./components/PlayUI";
import CreateUI from "./components/CreateUI";
import PlayPuzzleListUI from "./components/PlayPuzzleListUI";

export default class Checkmate extends React.Component {

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={MainMenuUI} />
            <Route path="/gamemode" component={GameModeUI} />
            <Route path="/classical" component={ClassicalUI} />
            <Route path="/bullet" component={BulletUI} />
            <Route path="/help-tutorial" component={HelpTutorialMenuUI} />
            <Route path="/leaderboard" component={LeaderboardUI} />
            <Route path="/settings" component={SettingsUI} />
            <Route path="/custom-puzzles" component={CustomPuzzlesUI} />
            <Route path="/create" component={CreateUI} />
            <Route path="/play-list" component={PlayPuzzleListUI} />
            <Route path="/play" component={PlayUI} />
            <Route path="/login" component={LoginUI} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </>
    );
  }
}