import React from "react";
import { render } from "react-dom";
import {Router,Route,browserHistory} from "react-router";
import {Root} from "./components/Root";
import {Header} from "./components/Header";
import {Landing} from "./components/Landing";
import {Login} from "./components/Login";
import {Registration} from "./components/Registration";


class App extends React.Component {
	render(){
		
		return (
			<Router history={browserHistory}>
				<Route path={"/"} component={Root}>
					<Route path={"landing"} component={Landing} />
					<Route path={"login"} component={Login} />
					<Route path={"register"} component={Registration} />
				</Route>
			</Router>
			
		);
	}
}

render(<App/>,window.document.getElementById("app"));
























