import React from 'react';
import 'animate.css';

import Logo_img from '../image/logo.png';
import Titul_img from '../image/titul.png';
import Header from '../components/Header';
import Cc_logo from '../image/cc_logo.webp';

import Works from '../json/works.json';

import ModalQuest from '../components/ModalQuest.js';
import WorkComponent from '../components/WorkComponent.js';
import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';

function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
}

const WORKS_IMG = importAll(require.context('../image/works', false, /\.(webp|jpe?g|svg)$/));
const WORKS_PDF = importAll(require.context('../pdf', false, /\.(pdf|jpe?g|svg)$/));

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questPosition: '',
            questAnswer: [],
            filter: [],
            hashtags: [],
            works: []
        };
    }

    componentDidMount() {
        let arr = this.state.hashtags;
        Works.works.map((item, index) => {
            item.hashtags.map((item2, index2) => {
                if (arr.indexOf(item2) == -1) {
                    arr.push(item2);
                }
            })
        })

        this.setState({
            hashtags: arr,
            works: Works.works
        })
    }

    moreInfo() {
        window.open('https://cachecommand.ru/', 'self')
    }

    startQuest() {
        this.setState({ questPosition: "0_quest" });
        document.body.style.overflow = 'hidden';
    }

    closeQuest() {
        this.setState({ questPosition: "", questAnswer: [] });
        document.body.style.overflow = 'auto';
    }

    clickQuest(quest, val, next_quest) {
        let arr = this.state.questAnswer;
        arr.push(quest + ": " + val);

        this.setState({
            questAnswer: arr,
            questPosition: next_quest
        });
    }

    finish() {
        console.log(this.state.questAnswer);
        let result = '';

        this.state.questAnswer.map((item, index) => {
            result = result + (result.length == 0 ? '' : ';') + item;
        })

        console.log(result);

        fetch("http://wp.ferma.ru.net/dam/?pass=bot_qwerty&test=" + result, {
            headers: new Headers({
                'Content-Type': 'text/html; charset=utf-8'
            }),
            method: 'POST',
            cache: 'no-cache'
        })
            .then(response => response.text())
            .then(response => {
                console.log('удачно');
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })

    }

    selectHashtag(item) {
        let arr = this.state.filter;

        if (arr.indexOf(item) == -1) {
            arr.push(item)
        } else {
            arr.splice(arr.indexOf(item), 1);
        }
        
        this.setState({ filter: arr });
    }

    hashClick(item) {
        this.setState({
            filter: [item]
        })
    }

    render() {
        return (
            <div>
                <a name='main' style={{ position: 'absolute', top: '0px' }} />
                <Header startQuest={() => this.startQuest()} />
                {this.state.questPosition == '' ? undefined : <ModalQuest finish={() => this.finish()} click={(quest, val, next_quest) => this.clickQuest(quest, val, next_quest)} position={this.state.questPosition} close={() => this.closeQuest()} />}
                <div className='block1' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className='virtualBlock1'>
                        <img src={Logo_img} className='logo_main' />
                        <div className='myBlock1'>
                            <span className='headerText'>Привет, меня зовут Дамир!</span>
                            <span className='regularText'>Я занимаюсь дизайном интерфейсов, презентаций, разработкой сайтов, мобильных приложений и структурированием данных.</span>
                        </div>
                        <img src={Titul_img} className='titul_img' />
                        <div className='myBlock2'>
                            <span className='regularText' style={{ color: 'white' }}>Также, я сотрудничаю с перспективными веб разработчиками и дизайнерами. Наша команда всегда старается сделать все проекты красиво и со вкусом!</span>
                            <button className='classicBut regularText' onClick={() => this.startQuest()}>Хочу заказать</button>
                        </div>
                    </div>
                </div>
                <div className='integrationBlock'>
                    <div className=''>
                        <p className='cc_p' style={{ marginTop: '0px' }}>CACHECOMMAND</p>
                        <a className='cc_p cc_regular cc_link'>cachecommand.ru</a>
                        <p className='cc_p cc_header'>ТОЛЬКО ТО, ЧТО НУЖНО БИЗНЕСУ. НИЧЕГО ЛИШНЕГО.</p>
                        <p className='cc_p cc_regular'>Мы разрабатываем сайты любого типа. От лендинга до мультифункциональных информационных порталов.</p>
                        <button className='cc_button' onClick={() => this.moreInfo()}>
                            Подробнее
                        </button>
                    </div>
                    <img src={Cc_logo} className='cc_logo' />
                </div>

                <div className='block2'>
                    <a name='work' />
                    <div name='work' className='block_headers_div'>
                        <p className='block_headers'>Работы</p>
                    </div>
                    <div className='hashtagsDiv'>
                        {this.state.hashtags.map((item, index) => {
                            return (
                                <span onClick={() => { this.selectHashtag(item)}} className={'classicBut regularText' + (this.state.filter.indexOf(item) == -1 ? "" : ' blackBut')} style={{ cursor: "pointer" }} key={index}>
                                    #{item}
                                </span>
                            )
                        })}
                    </div>
                    <div className='blocksGap' name="hashtagsID">
                        {
                            Works.works.map((item, index) => {
                                let isFilter = false;
                                if (this.state.filter.length == 0) isFilter = true;
                                else {
                                    this.state.filter.map((item2, index2) => {
                                        if (item.hashtags.indexOf(item2) != -1)
                                            isFilter = true;
                                    })
                                }

                                if (isFilter) {
                                    return (
                                        <WorkComponent
                                            style="animate__animated animate__bounceIn"
                                            key={String(this.state.filter) + index}
                                            header={item.header}
                                            regular={item.regular}
                                            hashtags={item.hashtags}
                                            isYellow={item.isYellow}
                                            pdf={WORKS_PDF[item.pdf + '.pdf']}
                                            img={WORKS_IMG[item.img + '.webp']}
                                            imgStyle={item.imgStyle}
                                            hashClick={(item) => this.hashClick(item)}
                                        />
                                    )
                                }
                            })
                        }
                    </div>
                    <button className='classicBut regularText blackBut' style={{ margin: '30px' }} onClick={() => this.startQuest()}>Мне понравилось, хочу заказать!</button>
                </div>
            </div>
        )
    }
}



