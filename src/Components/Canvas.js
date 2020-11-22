import { findByText } from '@testing-library/react'
import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom';

// const Canvas = props => {
  
//   const canvasRef = useRef(null)
  
//   const draw = ctx => {
//     ctx.fillStyle = '#000000'
//     ctx.beginPath()
//     ctx.arc(50, 100, 20, 0, 2*Math.PI)
//     ctx.fill()
//   }
  
//   useEffect(() => {
    
//     const canvas = canvasRef.current
//     const context = canvas.getContext('2d')
//     const w = canvas.width
//     const h = canvas.height

//     canvas.addEventListener("mousemove", function (e) {
//         findByText('move', e)
//     }, false);
    
//     //Our draw come here
//     draw(context)
//   }, [draw])
  
//   return (
//       <div>
//   <img id="canvasimg"/>
//   <div>Choose Color</div>
//         <div id="green" onclick="color(this)"></div>
//         <div id="blue" onclick="color(this)"></div>
//         <div id="red" onclick="color(this)"></div>
//         <div id="yellow" onclick="color(this)"></div>
//         <div id="orange" onclick="color(this)"></div>
//         <div id="black" onclick="color(this)"></div>
//         <div>Eraser</div>
//         <div id="white" onclick="color(this)"></div>
//         <input type="button" value="save" id="btn" size="30" onclick="save()"/>
//         <input type="button" value="clear" id="clr" size="23" onclick="erase()"></input>
//         <canvas ref={canvasRef} {...props}/>
//       </div>
    
    
//     ) 
// }

// export default Canvas
export default class canvas extends React.Component{
  constructor(props) {
      super(props);
      //added state 
      this.state={
          isDown: false,
          previousPointX:'',
          previousPointY:''
      }
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);
  }
  render() {
      return (
          <div>    
              <canvas id="canvas" ref="canvas"
                      width={640}
                      height={425}
                      onMouseDown={
                          e => {
                              let nativeEvent = e.nativeEvent;
                              this.handleMouseDown(nativeEvent);
                          }}
                      onMouseMove={
                          e => {
                              let nativeEvent = e.nativeEvent;
                              this.handleMouseMove(nativeEvent);
                          }}    
                      onMouseUp={
                          e => {
                              let nativeEvent = e.nativeEvent;
                              this.handleMouseUp(nativeEvent);
                          }}
              />
          </div>    
      );
  }

  handleMouseDown(event){ //added code here
      console.log(event);    
      this.setState({
          isDown: true,
          previousPointX:event.offsetX,
          previousPointY:event.offsetY
      },()=>{    
          const canvas = ReactDOM.findDOMNode(this.refs.canvas);    
          var x = event.offsetX;
          var y = event.offsetY;
          var ctx = canvas.getContext("2d");
          console.log(x,y);
          ctx.moveTo(x,y);
          ctx.lineTo(x+1,y+1);
          ctx.stroke();
      })
  }
  handleMouseMove(event){

  }
  handleMouseUp(event){
      this.setState({
          isDown: false
      });
      //if(this.state.isDown){
          const canvas = ReactDOM.findDOMNode(this.refs.canvas);
          var x = event.offsetX;
          var y = event.offsetY;
          var ctx = canvas.getContext("2d");

          ctx.moveTo(this.state.previousPointX,this.state.previousPointY);
          ctx.lineTo(x,y);
          ctx.stroke();
          ctx.closePath();
      //}
  }
  componentDidMount() {
      const canvas = ReactDOM.findDOMNode(this.refs.canvas);
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = 'rgb(200,255,255)';
      ctx.fillRect(0, 0, 640, 425);
  }
}