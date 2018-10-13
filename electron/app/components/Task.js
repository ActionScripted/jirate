// @flow
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import posed from 'react-pose';

import styles from 'Components/Task.scss';

const cx = classNames.bind(styles);

type Props = {
  description: string,
  isActive: boolean
};

export default class Task extends Component<Props> {
  render() {
    const { description, isActive } = this.props;
    const TaskPosed = posed.li();

    const classes = cx({
      base: true,
      isActive
    });

    return <TaskPosed className={classes}>{description}</TaskPosed>;
  }
}
