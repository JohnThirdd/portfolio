import React from 'react';
import Logo_img from '../image/logo.png';
import Titul_img from '../image/titul.png';
import Header from '../components/Header';
import Cc_logo from '../image/cc_logo.webp'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            easy: 0,
            middle: 0,
            hard: 0
        };
    }

    componentDidCatch(){
        
    }

    moreInfo(){
        window.open('https://cachecommand.ru/', 'self')
    }

    render() {
        return(
            <div>
                <button onClick={() => this.setState({easy: this.state.easy + 1})}>
                    Легкий: {this.state.easy}
                </button>
                <button onClick={() => this.setState({middle: this.state.middle + 1})}>
                    Средний: {this.state.middle}
                </button>
                <button onClick={() => this.setState({hard: this.state.hard + 1})}>
                    Сложный: {this.state.hard}
                </button>
            </div>
        )
    }
}