import React,{Component} from "react";
import "./calculator.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

class DisplayRow extends Component {
    render() {
        return (
            <div >
                <input type="text" className="textbox"  value = {this.props.value}/>
            </div>
        );
    }
}

export default DisplayRow;