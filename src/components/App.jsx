import React from 'react'
import { loadYaml } from '../utils/yaml.js'

import Header from './Header.jsx'
import BasicInput from './BasicInput.jsx'
import Results from './Results.jsx'
import Affiliation from './Affiliation.jsx'

import '../assets/css/main.css'
import '../assets/css/reset.css'


const SMIG_TND_2016 = 338
const SMIG_TND_AN_2016 = SMIG_TND_2016 * 12


export default class App extends React.Component {

  constructor(props){
    super(props)

    this.state = { 
    	// typeSalaireEntre: 'brut',
    	// salaireNetAPayer: smic_tnd,
		  typeEmploye: "fonctionnaire",
		  salaire: SMIG_TND_2016,
		  periodeSalaire: "an",
		  statutFamilial: "celibataire",
		  nbEnfants: 0,

		  results: {
        salaire_net_a_payer: 0,
		  	salaire_imposable: 0,
        salaire_de_base: 0,
        salaire_super_brut: 0
		  }
    }
    this.handleChange = this.handleChange.bind(this)
    console.log('App')
    console.log(this.state.salaire)
  }

  	//see handleChange argument struct
	handleChange(partialState){
		console.log("App handleChange")
		//console.log(this.state)
		//console.log("before " + this.state.salaire)
		this.setState(partialState)
		//console.log("after " + this.state.salaire)
	}

  render() {
	console.log("App : ")
	console.log(this.state)

    var simulatorName = "OpenJibaya"
    var inputTouched = false
    var inputChanged = false
    //inputTouched={ inputTouched } inputChanged={ inputChanged } />

    const repartition_budget = loadYaml('repartition_budget.yaml')

    return (
      <div className="widget">
        <Header />
        <BasicInput { ...this.state } onUserChange={ this.handleChange } />
        <Results    { ...this.state } repartitionBudget={ repartition_budget }/>
        <Affiliation />
      </div>
    );
  }
}
