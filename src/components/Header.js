import React from 'react';

export default class Header extends React.Component { 

    render() {
        return(
            <div className='header_div'>
                <span onClick={ () => window.location.href = '#main' } className='header_text'>
                    Про меня
                </span>
                <span onClick={ () => window.location.href = '#work' } className='header_text'>
                    Работы
                </span>
                <button className='header_button' onClick={() => this.props.startQuest()}>
                    Сделать заказ
                </button>
            </div>
        )
    }
}