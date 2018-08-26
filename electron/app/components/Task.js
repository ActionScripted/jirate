// @flow
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'Components/Task.scss';

const cx = classNames.bind(styles);

type Props = {
  description: string,
  isActive: boolean
};

export default class Task extends Component<Props> {
  render() {
    const { description, isActive } = this.props;

    const classes = cx({
      base: true,
      isActive
    });

    return <li className={classes}>{description}</li>;
  }
}
