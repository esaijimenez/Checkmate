import React from "react";
import { Link } from "react-router-dom";

export default class LoginUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pathname: ""
        };
    };

    componentDidMount() {
    };

    handleSubmit = () => {
        console.log("Submitted")
        const usernameInput = document.getElementById("username");
        const username = usernameInput.value;
        console.log(username);

        this.props.history.push({
            pathname: '/classical',
            state: {
                username
            }
        });
    }

    render() {
        return (
            <div>
                <Link to="/"><button>Back</button></Link>
                <h1>LoginUI</h1>

                <form>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" /><br />

                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" /><br />

                    <input type="submit" value="Submit" onClick={this.handleSubmit}></input>
                </form>
            </div>

        );
    }
}