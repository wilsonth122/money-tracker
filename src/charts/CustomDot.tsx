import React, { Component } from 'react';

export default class CustomDot extends Component<any, any> {
    ionColorPrimary = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-primary');

    dotStye = {
        fill: this.ionColorPrimary
    }

    activeDotStyle = {
        stroke: this.ionColorPrimary,
        strokeWidth: 2,
        fillOpacity: 0
        
    }

    constructor(props: any) {
        super(props);

        this.state = {
            hover: false
        }
    }

    handleClick = () => {
        this.props.onClick(this.props.index, this.props.payload);
    }

    handleMouseOver = () => {
        this.setState({
            hover: true
        })
    }

    handleMouseOut = () => {
        this.setState({
            hover: false
        })
    }
    
    render() {
        const { cx, cy } = this.props;
        const active = this.props.index === this.props.active ? true : false;

        return (
            <svg cx={cx} cy={cy} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                <circle style={this.dotStye} cx={cx} cy={cy} r={this.state.hover ? 14 : 8}></circle>
                {active && <circle style={this.activeDotStyle} cx={cx} cy={cy} r="12"></circle>}
            </svg>
        );
    }
}