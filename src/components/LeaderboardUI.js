import React from "react";
import { Link } from "react-router-dom";
import ClassicalUI from "./ClassicalUI";
import { db } from "../firebase.js";
import { ref, onValue, set } from 'firebase/database';

import '../styles/LeaderboardUI-style.css'

export default class LeaderboardUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            _score: 1,
            allScores: [],
            numScores: 0
        };
    };

    componentDidMount(){
        this.getScores();
        this.setScores("Test",1);
    }
    
    getScores = () => {
        const mateRef = ref(db, '/leaderboards/classical');
        onValue(mateRef, (snapshot) => {
            const count = snapshot.size;
            
            //Pushes all the puzzles from the database into an array
            let allScores = [];
            snapshot.forEach((scoreSnapshot) => {
                allScores.push({
                    name: scoreSnapshot.child("name").val(),
                    score: scoreSnapshot.child("score").val()
                })
            });
            //Sets some of the state variables
            this.setState({
                numScores: count,
                allScores: allScores
            })
        })
    }

    setScores = (name, score) => {
        let userName = name
        let userScore = score
        const mateRef = ref(db, '/leaderboards/classical');
        set(mateRef,{
            name: userName,
            score: userScore
        });
    };
    
    render() {
        return (
            <div>
                <Link to="/"><button class = "leaderboard--back">Back</button></Link>
                <h1>Leaderboards</h1>
                <div>
                    <h2>Bullet Mate</h2>
                    <h2>Classical Mate</h2>
                </div>
                <div class = " bullet--leaderboard--wrapper">
                    <div class = "bullet--name--title">name</div>
                    <div class = "bullet--score--title">score</div>
                    <div class = "bullet--time--title">time</div>

                    <div>paul</div>
                    <div>24</div>
                    <div>3</div>

                    <div>paul</div>
                    <div>24</div>
                    <div>3</div>

                    <div>paul</div>
                    <div>24</div>
                    <div>3</div>

                    <div>paul</div>
                    <div>24</div>
                    <div>3</div>

                    <div>paul</div>
                    <div>24</div>
                    <div>3</div>

                    <div>paul</div>
                    <div>24</div>
                    <div>3</div>

                    <div>paul</div>
                    <div>24</div>
                    <div>3</div>

                    <div>paul</div>
                    <div>24</div>
                    <div>3</div>

                    <div>paul</div>
                    <div>24</div>
                    <div>3</div>

                    <div>paul</div>
                    <div>24</div>
                    <div>3</div>
                </div>

            </div>
        );
    }
}