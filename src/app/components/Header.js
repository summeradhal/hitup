import React from "react"

export const Header = (props) =>{
	
		return(
			<nav className="navbar ">
					<div className="container">
						<div className="navbar-header">
							<ul className="nav navbar-nav">
								<li><a href="/landing"><span className="glyphicon glyphicon-home"></span></a></li>
								<li><a href="/login">Login</a></li>
								<li><a href="/register">Register</a></li>
							</ul>
						</div>
					</div>
				</nav>
			)
	}
