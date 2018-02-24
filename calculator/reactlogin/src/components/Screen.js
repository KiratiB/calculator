
import React,{Component} from "react";
import DisplayRow from "./DisplayRow";

class Screen extends Component {
    render(){
        return(
            <div>
                <DisplayRow  value = {this.props.question} />
                <DisplayRow  value = {this.props.answer} />
            </div>
        );
    }
}

export default Screen;