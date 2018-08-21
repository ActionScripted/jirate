// @flow
import * as React from 'react';
import styles from './TitleBar.scss';

type Props = {
  children: React.Node
};

export default class TitleBar extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return (
      <div className={styles.titlebar} data-tid="titlebar">
        {children}
      </div>
    );
  }
}
