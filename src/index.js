import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Immutable from 'immutable';
import './styles.css';
import axios from 'axios';

class DrawArea extends React.Component {
  // state = {errorMessage: ''};
  constructor() {
    super();

    this.state = {
      lines: new Immutable.List(),
      isDrawing: false,
      saveMessage: ''
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);

  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button != 0) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);
    console.log(point);

    this.setState(prevState => ({
      lines: prevState.lines.push(new Immutable.List([point])),
      isDrawing: true
    }));
  }

  loadLastMap = () => {

    this.setState(prevState => ({
      lines: new Immutable.List()
    }));
  
    console.log('bb');
    var that = this;
    const loadLastAsync = async () => {
      var obj = await axios.get('http://localhost:3001/api/maps/getLast')
      .then(function (response) {
        const lastMap = response.data.lastMap._tail.array;
        console.log(lastMap);
     
        
        for (let index = 0; index < lastMap.length-1; index++) {
          let arrMaps = [];
          for (let j = 0; j < lastMap[index].length; j++) {
            console.log(lastMap[index][j]);
            const point = new Immutable.Map({x: lastMap[index][j].x, y:lastMap[index][j].y});
            arrMaps.push(point);
         }
         that.setState(prevState => ({
          
          lines: prevState.lines.push(new Immutable.List(arrMaps))
        }));    
        }
        // console.log(arrMaps);

        

        // that.setState(prevState => ({
          
        //   lines: prevState.lines.push(new Immutable.List(arrMaps))
        // })); 
        console.log(that.state.lines);
      })
      .catch(err => console.log(err))
    };
    loadLastAsync();
    
    // this.setState(prevState.lines.push)
  }

  handleMouseMove(mouseEvent) {
    if (!this.state.isDrawing) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);
    
    this.setState(prevState =>  ({
      lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point))
    }));
  }

  handleMouseUp() {
    this.setState({ isDrawing: false });
  }

  

  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    console.log(mouseEvent.clientX - boundingRect.left);
    console.log(mouseEvent.clientY - boundingRect.top);
    

    return new Immutable.Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    });
  }

  saveMap = () => {
    console.log('post');
    console.log(this.state.lines);
    var obj = Object.assign({},this.state.lines);
    // var obj = this.state.lines;
    console.log(obj);
    const saveAsync = async () => {
      const data = await axios.post('http://localhost:3001/api/maps', obj)
      .then(this.setState({saveMessage: 'Guardado con éxito!'}))
      .catch(err => console.log(err));
    };
    saveAsync();
  }

  testDraw = () => {

    this.setState(prevState => ({
      lines: new Immutable.List()
    }));
  
    let arrMaps = [];
    let arrMaps2 = [];
      for (let index = 0; index < 100; index++) {
        const point = new Immutable.Map({x: index+1, y:index+2});
        arrMaps.push(point);
      };
      console.log(arrMaps);

    this.setState(prevState => ({
      
      lines: prevState.lines.push(new Immutable.List(arrMaps))
    })); 

    for (let index = 180; index < 250; index++) {
      const point = new Immutable.Map({x: index+1, y:index+2});
      arrMaps2.push(point);
    };
    this.setState(prevState => ({
      
      lines: prevState.lines.push(new Immutable.List(arrMaps2))
    })); 


  }

  

  renderContent() {
    if(this.state.saveMessage){
      return <div>Error: {this.state.saveMessage}</div>
    }
    else{
      return <div></div>
    }
  }

  render() {
    return (
      console.log(this.state.lines),
      <div
        id="drawArea"
        className="drawArea"
        ref="drawArea"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
      >
        <Drawing lines={this.state.lines} />
        {this.renderContent()}
        <button
          className="littleb"
          onClick={this.saveMap}
        >
          Save
        </button>
        <button
          className="littleb2"
          onClick={this.loadLastMap}
        >
          LoadLast
        </button>
        <button
          onClick={this.testDraw}
        >
          Prueba Dibujo
        </button>
      </div>
    );
  }
}

function Drawing({ lines }) {
  return (
    <svg className="drawing">
      {lines.map((line, index) => (
        <DrawingLine key={index} line={line} />
      ))}
    </svg>
  );
}

function DrawingLine({ line }) {
  const pathData = "M " +
    line
      .map(p => {
        return `${p.get('x')} ${p.get('y')}`;
      })
      .join(" L ");

  return <path className="path" d={pathData} />;
}

ReactDOM.render(<DrawArea />, document.getElementById("root"));

// ReactDOM.render(<App/>, document.querySelector("#root"));