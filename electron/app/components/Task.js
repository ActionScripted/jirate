// @flow
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import posed from 'react-pose';

import styles from 'Components/Task.scss';

const cx = classNames.bind(styles);

const TaskPosed = posed.li({
  enter: {
    scale: 1,
    opacity: 1
  },
  exit: {
    scale: 1.25,
    opacity: 0
  }
});

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

    return <TaskPosed className={classes}>{description}</TaskPosed>;
  }
}
