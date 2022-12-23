import React from 'react';

import Quest from '../json/question.json';

import ModalBack from '../image/modalBack.png';

function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
}

const MAIN_IMG = importAll(require.context('../image/quest/webp', false, /\.(webp|jpe?g|svg)$/));
const META_IMG = importAll(require.context('../image/quest/meta_img/webp', false, /\.(webp|jpe?g|svg)$/));
const COLORS = [
    {
        rus: "красный",
        color: "#FF0000"
    },
    {
        rus: "оранжевый",
        color: "#FF8A00"
    },
    {
        rus: "желтый",
        color: "#FFE600"
    },
    {
        rus: "зеленый",
        color: "#24EB20"
    },
    {
        rus: "голубой",
        color: "#00F0FF"
    },
    {
        rus: "синий",
        color: "#4200FF"
    },
    {
        rus: "фиолетовый",
        color: "#BD00FF"
    },
    {
        rus: "черный",
        color: "#000000"
    }
]

export default class ModalQuest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            soloInput_value: "",
            multiInput_value: [
                { value: "" }
            ],
            colorSelect: -1,
            scrollValue: Quest.question["20_quest"].min
        };
    }

    onChangeScroll = (e) => {
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
            e.style.setProperty('--value', e.value);
            e.style.setProperty('--min', e.min == '' ? '0' : e.min);
            e.style.setProperty('--max', e.max == '' ? '100' : e.max);
            e.addEventListener('input', () => e.style.setProperty('--value', e.value));
        }
        this.setState({scrollValue: value})
    }

    ChangeInputValue = (e) => {
        let name = e.target.name;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState({ [name]: value });
    }

    ChangeMultiInputValue = (e, index) => {
        let name = e.target.name;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        let result = this.state.multiInput_value;
        result[index].value = value;

        this.setState({
            multiInput_value: result
        })
    }

    isFilled_multiInput() {
        let result = true;
        this.state.multiInput_value.map((item,index) => {
            if(item.value != "" ) result = false;
        })

        return result;
    }

    addInput() {
        let arr = this.state.multiInput_value;
        arr.push({ value: "" });
        this.setState({
            multiInput_value: arr
        })
    }

    digitNumber(val) {
        // let val = this.state.scrollValue;
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "₽";
    }

    metaImg_render(arr) {
        return (
            <div style={{ overflowY: 'auto' }}>
                {
                    arr.map((item, index) => {
                        return (
                            <img key={index} src={META_IMG[item + ".webp"]} />
                        )
                    })
                }
            </div>
        )
    }

    onClickBut(val){
        let quest = Quest.question[this.props.position].text;
        if(val.value == "") {
            this.props.click(quest, val.text, val.next_quest);
        } else {
            this.props.click(quest, val.value, val.next_quest);
        }
        this.resetInputs();
    }

    onClickInput(isMulti) {
        let quest = Quest.question[this.props.position].text;
        let nextQuest = Quest.question[this.props.position].next_quest;
        let val;
        if(isMulti) {
            let arr = [];
            this.state.multiInput_value.map((item,index) => {
                arr.push(item.value);
            })
            val = arr;
        } else {
            val = this.state.soloInput_value;
        }

        this.props.click(quest, val, nextQuest);
        this.resetInputs();
    }

    onClickColor() {
        let quest = Quest.question[this.props.position].text;
        let nextQuest = Quest.question[this.props.position].next_quest;
        let val = COLORS[this.state.colorSelect].rus;

        this.props.click(quest, val, nextQuest);
        this.resetInputs();
    }

    onClickScroll() {
        let quest = Quest.question[this.props.position].text;
        let nextQuest = Quest.question[this.props.position].next_quest;
        let val = this.digitNumber(this.state.scrollValue);

        this.props.click(quest, val, nextQuest);
        this.resetInputs();
    }

    resetInputs(){
        this.setState({
            soloInput_value: "",
            multiInput_value: [
                { value: "" }
            ]
        })
    }

    classic() {
        return (
            <div className='modalWindow_bg'>
                <a href="#" className="close" onClick={() => { this.props.close() }} />
                <div style={{ position: 'relative' }}>
                    <img src={ModalBack} className='modalBack' />
                    <div className='modalQuest'>
                        <img src={MAIN_IMG[Quest.question[this.props.position].main_img + ".webp"]} className='questMainImg' />
                        <p>
                            {Quest.question[this.props.position].text}
                        </p>
                        {Quest.question[this.props.position].meta_img.length === 0 ? undefined : this.metaImg_render(Quest.question[this.props.position].meta_img)}
                        <div className='butAndMetaBut_div'>
                            <div className='modalButtons_div'>
                                {
                                    Quest.question[this.props.position].buttons.map((item, index) => {
                                        return (
                                            <button onClick={() => this.onClickBut(item)} style={{ display: 'inline-block', marginRight: '15px', marginBottom: '15px' }} key={index} className='classicBut regularText blackBut'>
                                                {
                                                    item.text
                                                }
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            {
                                Quest.question[this.props.position].meta_buttons.map((item, index) => {
                                    return (
                                        <span onClick={() => this.onClickBut(item)} className='metaBut' key={index}>
                                            {item.text}
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    soloInput() {
        return (
            <div className='modalWindow_bg'>
                <a href="#" className="close" onClick={() => { this.props.close() }} />
                <div style={{ position: 'relative' }}>
                    <img src={ModalBack} className='modalBack' />
                    <div className='modalQuest'>
                        <img src={MAIN_IMG[Quest.question[this.props.position].main_img + ".webp"]} className='questMainImg' />
                        <p>
                            {Quest.question[this.props.position].text}
                        </p>
                        <div className='butAndMetaBut_div'>
                            <div className='modalButtons_div'>
                                <input className='inputStyle' value={this.state.soloInput_value} onChange={this.ChangeInputValue.bind(this)} name='soloInput_value' placeholder={Quest.question[this.props.position].input_text} />
                                <button onClick={() => this.onClickInput(false)} disabled={this.state.soloInput_value == ""} style={{ display: 'inline-block', marginRight: '15px', marginBottom: '15px' }} className='classicBut regularText blackBut'>
                                    Далее
                                </button>
                            </div>
                            {
                                Quest.question[this.props.position].meta_buttons.map((item, index) => {
                                    return (
                                        <span onClick={() => this.onClickBut(item)} className='metaBut' key={index}>
                                            {item.text}
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    multiInput() {
        return(
            <div className='modalWindow_bg'>
                <a href="#" className="close" onClick={() => { this.props.close() }} />
                <div style={{ position: 'relative' }}>
                    <img src={ModalBack} className='modalBack' />
                    <div className='modalQuest'>
                        <img src={MAIN_IMG[Quest.question[this.props.position].main_img + ".webp"]} className='questMainImg' />
                        <p>
                            {Quest.question[this.props.position].text}
                        </p>
                        <div className='butAndMetaBut_div'>
                            <div style={{ overflowY: 'auto', maxHeight: '20vh' }}>
                                {
                                    this.state.multiInput_value.map((item, index) => {
                                        return(
                                            <input className='inputStyle' onChange={(val) => this.ChangeMultiInputValue(val,index)} placeholder={Quest.question[this.props.position].input_text} value={this.state.multiInput_value[index].value}/>
                                        )
                                    })
                                }
                                <button onClick={() => this.onClickInput(true)} disabled={this.isFilled_multiInput()} style={{ display: 'inline-block', marginRight: '15px', marginBottom: '15px' }} className='classicBut regularText blackBut'>
                                    Далее
                                </button>
                            </div>
                            <span onClick={() => {this.addInput()}} className='metaBut'>
                                {Quest.question[this.props.position].add_text}
                            </span>
                            {
                                Quest.question[this.props.position].meta_buttons.map((item, index) => {
                                    return (
                                        <span onClick={() => this.onClickBut(item)} className='metaBut' key={index}>
                                            {item.text}
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    color() {
        return(
            <div className='modalWindow_bg'>
                <a href="#" className="close" onClick={() => { this.props.close() }} />
                <div style={{ position: 'relative' }}>
                    <img src={ModalBack} className='modalBack' />
                    <div className='modalQuest'>
                        <img src={MAIN_IMG[Quest.question[this.props.position].main_img + ".webp"]} className='questMainImg' />
                        <p>
                            {Quest.question[this.props.position].text}
                        </p>
                        <div className='butAndMetaBut_div'>
                            <div className='modalButtons_div'>
                                {
                                    COLORS.map((item, index) => {
                                        return(
                                            <button onClick={() => this.setState({colorSelect: index})} key={index} className="colorSelect" style={{backgroundColor: item.color}}>
                                                {this.state.colorSelect == index ? "✔" : ""}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            <button onClick={() => this.onClickColor()} disabled={this.state.colorSelect == -1} style={{ width: '150px', display: 'inline-block', marginRight: '15px', marginBottom: '15px' }} className='classicBut regularText blackBut'>
                                Далее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    scroll() {
        return(
            <div className='modalWindow_bg'>
                <a href="#" className="close" onClick={() => { this.props.close() }} />
                <div style={{ position: 'relative' }}>
                    <img src={ModalBack} className='modalBack' />
                    <div className='modalQuest'>
                        <img src={MAIN_IMG[Quest.question[this.props.position].main_img + ".webp"]} className='questMainImg' />
                        <p>
                            {Quest.question[this.props.position].text}
                        </p>
                        <div style={{width: "100%"}}>
                            <div className='scrollSliderInfo'>
                                <p>
                                    {this.digitNumber(Quest.question[this.props.position].min)}
                                </p>
                                <p>
                                    {this.digitNumber(Quest.question[this.props.position].max)}
                                </p>
                            </div>
                            <input type="range" value={this.state.scrollValue} onChange={(val) => this.onChangeScroll(val)} className='styled-slider slider-progress' min={Quest.question[this.props.position].min} max={Quest.question[this.props.position].max}/>
                        </div>
                        <div className='butAndMetaBut_div'>
                            <div style={{ overflowY: 'auto', maxHeight: '20vh' }}>
                                <button onClick={() => this.onClickScroll()} className='classicBut regularText blackBut'>
                                    {Quest.question[this.props.position].text_summation == "after" ? Quest.question[this.props.position].button_text + this.digitNumber(this.state.scrollValue) : this.digitNumber(this.state.scrollValue) + Quest.question[this.props.position].button_text }
                                </button>
                            </div>
                            {
                                Quest.question[this.props.position].meta_buttons.map((item, index) => {
                                    return (
                                        <span onClick={() => this.onClickBut(item)} className='metaBut' key={index}>
                                            {item.text}
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    finish() {
        return(
            <div className='modalWindow_bg'>
                <a href="#" className="close" onClick={() => { this.props.close() }} />
                <div style={{ position: 'relative' }}>
                    <div className='modalQuest'>
                        <img src={MAIN_IMG[Quest.question[this.props.position].main_img + ".webp"]} className='finishImg' />
                        <div className='finishDiv'>
                            <p>
                                {Quest.question[this.props.position].header_text}
                            </p>
                            <span>
                                {Quest.question[this.props.position].regular_text}
                            </span>
                            <span style={{fontSize: "14px"}}>
                                {Quest.question[this.props.position].meta_text}
                            </span>
                        </div>
                        <button onClick={() => this.props.finish()} className='classicBut regularText blackBut'>
                            { Quest.question[this.props.position].button_text } 😍
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        if(Quest.question[this.props.position].type == "scroll")
            this.setState({scrollValue: Quest.question[this.props.position].min})
    }

    render() {
        switch (Quest.question[this.props.position].type) {
            default: return (this.classic());
            case "soloInput": return (this.soloInput());
            case "multiInput": return (this.multiInput());
            case "color": return (this.color());
            case "scroll": return (this.scroll());
            case "finish": return (this.finish());
        }
    }

}