import React, { Component } from 'react'
import Summary from './Summary.jsx'

import BarChart from './BarChart.jsx'
import WaterfallChart from './WaterfallChart.jsx'

import { fetchCalculate } from '../utils/openfisca.js'

import '../assets/css/Results.css'


let numberFormat = new Intl.NumberFormat('fr-FR').format

export default class Results extends Component {
	constructor(props){
		super(props)
		
		//console.log("typeEmploye " + typeEmploye)
		console.log("salaire " + this.props.salaire)
		
		// This binding is necessary to make `this` work in the callback
		this.handleOnButtonClick = this.handleOnButtonClick.bind(this)
		this.handleOnPlusClick = this.handleOnPlusClick.bind(this)
		
		this.state = {
			buttonClicked: false,
			plusClicked: false
		}
	}

	updateSalaireImposable(salaireImposable){
		console.log("updateSalaireImposable")
		this.props.results['salaire_imposable'] = salaireImposable
	}
	
	handleOnButtonClick(){
		console.log("!	Results - handleOnButtonClick")
		console.log("salaire " + this.props.salaire)
		fetchCalculate(this.props.salaire).then(response => { 
			console.log("response data "+ response.data)
		})
	}

	handleOnPlusClick(){
		console.log("!	Results - handleOnPlusClick")
		this.setState({ plusClicked: true })
	}

	render() {
		console.log("Results : ")
		console.log(this.props)

		let defaultTextColour = '#ffffff',
			defaultColour = '#4A89DC',
			buttonStyle = {background: defaultColour, borderColor: defaultTextColour, color: defaultTextColour}
		return (
			<div>
				<Summary {...this.props} handleOnButtonClick={ this.handleOnButtonClick } />

				{ this.state.buttonClicked ?
					<div>
						<br />
						<WaterfallChart />
						<br />
						<br />
						<div className="figures" align="center">
							<button type="button"
								className="action" autoComplete="off"
								onClick={ this.handleOnPlusClick }
								style={buttonStyle} >
								{
									<span>Quelles différences entre Lois de Finances ?</span>
								}
							</button>
							{ this.state.plusClicked ?
								<div>
									<span>Comparez les Lois de Finances 2016 / 2017 / 2018.</span>
								</div>
								:
								<div/>
							}
						</div>
						<br />
						<br />
						<BarChart year="2017" results={ this.props.results } repartitionBudget={ this.props.repartitionBudget }/>
					</div>
					:
					<div/>
				}
			</div>
		)
	}

}
