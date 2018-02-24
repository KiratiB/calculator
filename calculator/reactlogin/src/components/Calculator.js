import React, {Component} from 'react';
import * as API from '../api/API';
import Screen from "./Screen";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import './calculator.css';
class Calculator extends Component {

    constructor(props){
        super(props);
        this.state = {
            question: '',
            answer: '',
            lastChar: ''
        }
        this.handleClick = this.handleClick.bind(this)
        this.parseExpression = this.parseExpression.bind(this)
    }
    render() {
        return (
            <div className="customBox rounded" >
                <div className="font-weight-bold text-center border text-light">
                   CALCULATOR
                </div>
                <Screen className="justify-content-md-center"  question={this.state.question} answer  ={this.state.answer}/>
                <div className="button-row">
                    <input type="button" className=" btn-lg btn-default col-xs-3 custom_button" label={'1'} onClick={this.handleClick} value="1" />
                    <input type="button" className=" btn-lg btn-default col-xs-3 custom_button" label={'2'} onClick={this.handleClick} value="2" />
                    <input type="button" className=" btn-lg btn-default col-xs-3 custom_button" label={'3'} onClick={this.handleClick}  value="3"/>
                    <input type="button" className=" btn-lg btn-default col-xs-3 custom_button btn-op" label={'+'} onClick={this.handleClick}  value="+"/>
                </div>
                <div className="button-row">
                    <input type="button" className="btn-lg btn-default col-xs-3 custom_button" label={'4'} onClick={this.handleClick} value="4" />
                    <input type="button" className="btn-lg btn-default col-xs-3 custom_button" label={'5'} onClick={this.handleClick} value="5" />
                    <input type="button" className="btn-lg btn-default col-xs-3 custom_button" label={'6'} onClick={this.handleClick} value="6" />
                    <input type="button" className="btn-lg btn-default col-xs-3 custom_button btn-op" label={'-'} onClick={this.handleClick} value="-" />
                </div>
                <div>
                    <input type="button" className="btn-lg btn-default col-xs-3 custom_button" label={'7'} onClick={this.handleClick} value="7" />
                    <input type="button" className="btn-lg btn-default col-xs-3 custom_button" label={'8'} onClick={this.handleClick} value="8" />
                    <input type="button" className="btn-lg btn-default col-xs-3 custom_button" label={'9'} onClick={this.handleClick} value="9" />
                    <input type="button" className="btn-lg btn-default col-xs-3 custom_button btn-op" label={'*'} onClick={this.handleClick} value="*" />
                </div>
                <div className="button-row">
                    <input type="button" className="btn-lg btn-default col-xs-3 custom_button" label={'.'} onClick={this.handleClick} value="." />
                    <input type="button" className="btn-lg btn-default col-xs-3 custom_button" label={'0'} onClick={this.handleClick} value="0" />
                    <input type="button" className="btn-lg btn-default col-xs-3 custom_button" label={'Cls'} onClick={this.handleClick}value="C"/>
                    <input type="button" className="btn-lg btn-default col-xs-3 custom_button btn-op" label={'/'} onClick={this.handleClick} value="/" />
                </div>
                <div className="button-row">
                    <input type="button" className="btn-xl" label={'='} onClick={this.handleClick} value="=" />
                </div>
            </div>
        );
    }

    handleClick(event){
        const value = event.target.value;
        const opArray = ['+','-','*','/'];
        let expression = this.state.question;
        switch(value)
        {
            case '=':{
                var result = this.parseExpression(expression);
            }
            case 'C': {
                this.setState({question: '',  answer: '', lastChar: ''})
                break;
            }
            default: {
               if(opArray.includes(this.state.lastChar) && this.state.lastChar !== '')
               {
                   if(opArray.includes(value))
                   {
                       expression = expression.slice(0, -1) + value;
                   }
                   else
                   {
                       expression = expression + value;
                   }
               }
               else
               {
                   expression = expression + value;
               }
                this.setState({
                    question : expression,
                    lastChar : value
                })

                break;
            }
        }
    }

    parseExpression = (exp) => {
        try {
            var length = exp.length;
            var operand1 = '';
            var operand2 = '';
            var operator = '';
            var index = 0;
            for (var i = 0; i < length; i++) {
                if (exp[i] >= 0 || exp[i] <= 9 || exp[i] == '.') {
                    operand1 = operand1 + exp[i];
                }
                else {
                    if (i < length) {
                        index = i;
                        break;
                    }
                    else {
                    }
                }
            }
            for (var j = index; j < length; j++) {
                if (exp[j] === '+' || exp[j] === '-' || exp[j] === '*' || exp[j] === '/') {
                    operator = exp[j];
                    if (j < length) {
                        index = j;
                    }
                    break;
                }
                else {
                }
            }
            for (var k = index; k < length; k++) {
                if (exp[k] >= 0 || exp[k] <= 9 || exp[k] == '.') {
                    operand2 = operand2 + exp[k];
                }
            }
            var jsonObject = {
                number1: operand1,
                number2: operand2,
                op: operator
            }
            API.calc(jsonObject)
                .then((status) => {
                    console.log(status.result)
                    this.setState({question: exp ,answer: status.result})
                });
        }
        catch(error)
        {
        }
    };
}

export default Calculator;