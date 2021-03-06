import React from 'react';
import classNames from 'classnames';

import Body from './Table';
import Column from './Column';
import Cell from './Cell';
import Row from './Row';

import './index.styl';

export default class Table extends React.Component {
	columns = [];
	handleRowClick = (e) => {
		this.props.onRowClick(this.props.data[e.currentTarget.dataset.key]);
	};
	renderColumn = (column, key) => {
		const { title, ...props } = column;
		return <Column key={key} {...props}>{column.title}</Column>;
	};
	renderRow = (data, rowKey) => {
		return (
			<div
				className="_Table__Row"
				key={rowKey}
				onClick={this.props.onRowClick && this.handleRowClick}
				data-key={rowKey}
			>
				{this.columns.map((column, columnKey) => {
					return (
						<div className="_Table__Cell" key={columnKey}>
							{typeof column.children === 'function' ? column.children(data, rowKey, columnKey) : column.children}
						</div>
					);
				})}
			</div>
		);
	};
	render() { //   @TODO: Hard rendering
		this.columns = [];
		const children = [];
		React.Children.forEach(
			this.props.children,
			(child) => {
				if (child && child.type === Column) {
					this.columns[this.columns.length] = child.props;
				} else {
					children[children.length] = child;
				}
			},
		);
		return (
			<div className={classNames('_Table', this.props.className)}>
				<div className="_Table__Table">
					<div className="_Table__Header">
						{this.columns.map(this.renderColumn)}
					</div>
					<div className="_Table__Body">
						{this.props.data.map(this.renderRow)}
					</div>
				</div>
				{children}
			</div>
		);
	}
}

Table.defaultProps = {
	data: [],
};

Table.Column = Column;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
