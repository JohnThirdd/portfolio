import React from 'react';
import 'animate.css';
import { Transition } from 'react-transition-group';

export default class WorkComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questPosition: '',
            questAnswer: []
        };
    }

    render() {
        return (
            <div className={'myBlock3' + (this.props.isYellow ? ' myBlock4 ' : ' ') + this.props.style}>
            {/*  <div className={'myBlock3' + (this.props.isYellow ? ' myBlock4' : '')}> */}
                <div className='innerBlockSize'>
                    <span className='myBlock_header'>{this.props.header}</span>
                    <span className='myBlock_regular'>{this.props.regular}</span>
                    <div className='inner2BlockSize'>
                        {
                            this.props.hashtags.map((item, index) => {
                                return(
                                    <span onClick={() => this.props.hashClick(item)} className='hashtag' key={index}>
                                        #{item}
                                    </span>
                                )
                            })
                        }

                        <a href={this.props.pdf} without rel="noopener noreferrer" target="_blank">
                            <button className={'classicBut regularText' + (this.props.isYellow ? ' blackBut' : '')}>Подробнее</button>
                        </a>
                    </div>
                </div>
                <img src={this.props.img} style={this.props.imgStyle} />
            </div>
        )
    }
}