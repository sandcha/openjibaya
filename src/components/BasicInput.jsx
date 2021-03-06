import React, { Component } from 'react'
import '../assets/css/BasicInput.css'

const SMIG_TND_2016 = 338
const SMIG_TND_AN_2016 = SMIG_TND_2016 * 12

export default class BasicInput extends Component {
	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		const name = event.target.name
		const value = event.target.value
		const partialState = {
			[name]: value
		}
		console.log(">>>" + partialState)
		console.log("handleChange> " + name + ": " + value)
		console.log("avant " +  this.props.salaire)
		this.props.onUserChange(partialState)
		console.log("après " + this.props.salaire)
	}

	//value={ this.props.salaire }
	//onChange={e => this.handleChange({salaire: e.target.value})}
	//form onSubmit={() => console.log("!!! submit form") /* save your form here */}

	render() {
		//TN :
		//Je suis [un/une] [fonctionnaire/employé-e/professionnel-le libéral-e].
		//Je gagne [...] TND par [mois/an] [après/avant] paiement de l'impôt.
		//Je suis [célibataire/marié/chef de famille].
		//J'ai [0/1/2/3/plus de 4] enfant-s.
		console.log("BasicInput : ")
		console.log(this.props)
		
		return (
			<form className="basic-input">
				Je suis 
				<select name="typeEmploye" value={ this.props.typeEmploye } onChange={ this.handleChange }>
					<option value="employe">employé-e</option>
					<option value="fonctionnaire">fonctionnaire</option>
					<option value="professionnel_liberal" disabled="true">professionnel-le libéral-e</option>
				</select>
				.<br />

				Je touche 
				<fieldset>
					<input id="salaire" name="salaire" component="input" type="number"
					min="0" max="9999999" value={ this.props.salaire } placeholder={ SMIG_TND_AN_2016 } step="any"
					onChange={ this.handleChange } />
					<label htmlFor="salaire">
						&nbsp; Dinars Tunisiens &nbsp;
					</label>

					<span className="input-help">
						Rémunération totale<br/>
						<em>(min. <span data-source="smic_proratise" data-round>{ SMIG_TND_2016 }</span>)</em>
						, dont primes.
					</span>

					<span>par</span>	
					<select name="periodeSalaire" value={ this.props.periodeSalaire } onChange={ this.handleChange }>
						<option value="mois">mois</option>
						<option value="an">an</option>
					</select>	
					<span>net d&#39;impôts et de cotisations sociales.</span>

				</fieldset>
				<br />
				
				Je suis
				<select name="statutFamilial" value={ this.props.statutFamilial } onChange={ this.handleChange }>
					<option value="celibataire">célibataire</option>
					<option value="marie">marié non chef de famille</option>
					<option value="chef_de_famille">chef de famille</option>
				</select>
				.<br />
				
				J&#39;ai 
				<input id="nbEnfants" name="nbEnfants" component="input" type="number"
				min="0" max="9999999" value={ this.props.nbEnfants } placeholder="0" step="any"
				onChange={ this.handleChange } />
				enfant-s.<br />
				
			</form>
		)
	}
}
