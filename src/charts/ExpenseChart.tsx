import React, { Component } from 'react';
import { LineChart, ResponsiveContainer, Line } from 'recharts';
import CustomDot from './CustomDot';

export default class ExpenseChart extends Component<any, any> {
	ionColorPrimary = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-primary');
	
	constructor(props: any) {
		super(props);

		this.state = {
			activeDot: this.props.data.length - 1
		}
	}

	handleClick = (index: number, payload: Object) => {
		this.setState({
			activeDot: index
		});

		this.props.onClick(payload);
	}

	componentDidUpdate(previousProps: any) {
		if(this.props.data !== previousProps.data) {
			this.setState({
				activeDot: this.props.data.length - 1
			})
		}
	}

    render() {
		return (
			<ResponsiveContainer width="100%" height={100}>
				<LineChart data={this.props.data} margin={{ top: 14, right: 14, left: 14, bottom: 14 }}>
					<Line type="monotone" 
						dataKey="total" 
						dot={<CustomDot onClick={this.handleClick} active={this.state.activeDot} />}
						animationDuration={500} 
						stroke={this.ionColorPrimary} 
						strokeWidth={3} />
                </LineChart>
			</ResponsiveContainer>
		);
  	}
}