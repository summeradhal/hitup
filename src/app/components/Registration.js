import React from "react"

export class Registration extends React.Component{
	render(){
		return(
			<div className=" register container ">
				<div className="input-group">
					<h3> Email </h3>
					<div>
					  <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1"></input>
					</div>
				</div>


				<div className="input-group">
					<h3> Username</h3>
					<div>
					 
					  <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1"></input>
					</div>
				</div>


				<div className="input-group">
					<h3> Password </h3>
					<div>
					  
					  <input type="password" className="form-control" placeholder="Password" aria-describedby="basic-addon1"></input>
					</div>
				</div>

				<div className="input-group">
				<h3> Confirm Password </h3>
					<div>
					  <input type="password" className="form-control" placeholder="Confirm Password" aria-describedby="basic-addon1"></input>
				</div>
				</div>
			</div>

			);
	}
}