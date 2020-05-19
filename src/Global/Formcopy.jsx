import React, { Component } from 'react';
import './css/Formcopy.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

// subcomponentes
import Intro from './components/form/0.0Introduction'
import Names from './components/form/1Names'
import Phone from './components/form/2Phone'
import Donation from './components/form/3.0Donations'
import Confirmation from './components/form/5Confirmation'
import Verification from './components/form/0.1Verification'

class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pasos: 0,
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            emailConfirmation: '',
            donations: [],
            donationStep: 0,
            alreadyDonate: false,
            firstDonationCreated: false
        };
    }

    //transiciones
    init = () => {
        if (this.state.pasos === 0)
            return (<Intro
                firstDonationButton={this.nextStep}
                donationButon={this.alreadyDonateNextStep}
            />)

        if (this.state.pasos === 1)
            return (
                <Names
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    value={this.state}
                />
            )

        if (this.state.pasos === 2)
            return (< Phone
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                value={this.state}
            />)
        if (this.state.pasos === 3) {
            return (
                this.state.donations.filter(x => x.id === this.state.donationStep).map(filteredDonation => (
                    <Donation
                        value={this.state}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep2}
                        key={filteredDonation.id}
                        id={filteredDonation.id}
                        newDonation={this.clickNewDonation}
                        backDonation={this.backDonation}
                        forwardDonation={this.forwardDonation}
                    >
                    </Donation >
                ))
            )
        }

        if (this.state.pasos === 4)
            return (< Confirmation
                value={this.state}
                nextStep={this.nextStep}
                prevStep={this.prevStep}

            />)

        if (this.state.pasos === 11)
            return (<Verification
                nextStep={this.nextStep2}
                prevStep={this.alreadyDonatePrevStep}
                handleChange={this.handleChange}
                value={this.state}
            />)
    }


    nextStep = () => {
        const { pasos } = this.state
        this.setState({
            pasos: pasos + 1
        });
        if (pasos === 2)
            this.setState({
                alreadyDonate: false
            }
            )
        if (!this.state.firstDonationCreated) {
            var don = this.state.donations
            var done = new Donation();
            done.id = 0
            don.push(done)
            this.setState({ donation: don })
            this.setState({ firstDonationCreated: true })
        }
    }

    prevStep = () => {
        const { pasos } = this.state
        this.setState({
            pasos: pasos - 1
        });
    }

    alreadyDonateNextStep = () => {
        this.setState({
            pasos: 11,
            alreadyDonate: true
        })
    }

    alreadyDonatePrevStep = () => {
        this.setState({
            pasos: 0
        })
    }

    nextStep2 = () => {
        if (!this.state.firstDonationCreated) {
            var don = this.state.donations
            var done = new Donation();
            done.id = 0
            don.push(done)
            this.setState({ donation: don })
            this.setState({ firstDonationCreated: true })
        }
        this.setState({
            pasos: 3
        })
    }

    prevStep2 = () => {
        if (this.state.alreadyDonate === true)
            this.setState({
                pasos: 11
            })
        else
            this.setState({
                pasos: 2
            })
    }

    //guardado de datos
    handleChange = input => (e) => {
        e.preventDefault()
        this.setState({ [input]: e.target.value })
    }

    //nueva donacion
    clickNewDonation = () => {
        var don = this.state.donations
        var done = new Donation();
        done.id = don.length
        this.setState({ donationStep: don.length })
        don.push(done)
        this.setState({ donation: don })
    }
    //botones nueva donacion
    backDonation = () => {
        var pasoDonacion = this.state.donationStep - 1
        this.setState({ donationStep: pasoDonacion })
    }
    forwardDonation = () => {
        var pasoDonacion = this.state.donationStep + 1
        this.setState({ donationStep: pasoDonacion })
    }

    render() {
        return (
            <div id='background'>
                <Container id="formulario">
                    <Form id='left-letters'>
                        {this.init()}
                    </Form>
                </Container>
            </div>

        );
    }
}

export default Formulario;
