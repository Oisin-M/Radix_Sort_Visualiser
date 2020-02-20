import React from 'react';
import {getLSDAnimations, getLSDAnimations_base} from './animations.js';
import './SortingVisualiser.css';
import {Container, Row, Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';

const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 50;
const MAX_SIZE = 1500;
const SCREEN_HEIGHT = (window.screen.height-150)/2000;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';


export default class SortingVisualiser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, MAX_SIZE));
    }
    this.setState({array});
    console.log(array);
    console.log(MAX_SIZE);
  }

  Radix_Sort_LSD() {
    const animations = getLSDAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      setTimeout(() => {
      for (let j = 0; j < animation.length; j++){
        setTimeout(() => {
        const barStyle = arrayBars[j].style;
        barStyle.height=`${animation[j]*SCREEN_HEIGHT}px`;
        barStyle.backgroundColor=SECONDARY_COLOR;
        setTimeout(() => {
          barStyle.backgroundColor=PRIMARY_COLOR;
        }, 20);
      }, (j * 20) * ANIMATION_SPEED_MS);
      }
    }, (i*20*animation.length+1) * ANIMATION_SPEED_MS);
  }
  this.setState(animations[-1]);
  }

  Radix_Sort_LSD_base(n) {
    const animations = getLSDAnimations_base(n, this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      setTimeout(() => {
      for (let j = 0; j < animation.length; j++){
        setTimeout(() => {
        const barStyle = arrayBars[j].style;
        barStyle.height=`${animation[j]*SCREEN_HEIGHT}px`;
        barStyle.backgroundColor=SECONDARY_COLOR;
        setTimeout(() => {
          barStyle.backgroundColor=PRIMARY_COLOR;
        }, 20);
      }, (j * 20) * ANIMATION_SPEED_MS);
      }
    }, (i*20*animation.length+1) * ANIMATION_SPEED_MS);
  }
  this.setState(animations[-1]);
  }

  render() {
    const {array} = this.state;

    return (
      <Row style={{paddingLeft: '10px'}}>
      <Container fluid={true} style={{padding: '0px'}}>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Radix Sort Visualiser (LSD)</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="https://www.google.com/">About</Nav.Link>
          <Container>
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.Radix_Sort_LSD_base(2)}>Binary Radix Sort</button>
          <button onClick={() => this.Radix_Sort_LSD_base(5)}>Quinary Radix Sort</button>
          <button onClick={() => this.Radix_Sort_LSD()}>Decimal Radix Sort</button>
          </Container>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Row className="justify-content-center" style={{width: '100vw'}}>
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value*SCREEN_HEIGHT}px`,
            }}></div>
        ))}
        </Row>


      </Container>
      </Row>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
