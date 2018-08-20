// @flow
import React, { Component } from 'react';
import styles from './TitleBar.scss';

type Props = {};

export default class TitleBar extends Component<Props> {
  props: Props;

  render() {
    return <div className={styles.titlebar} data-tid="titlebar" />;
  }
}
