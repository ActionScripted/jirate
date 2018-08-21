// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.scss';
import TaskList from './TaskList';

type Props = {};
type State = {};

export default class Home extends Component<Props, State> {
  props: Props;

  state: State;

  render() {
    // Hiding link/routes, for now
    const linkStyles = { display: 'none' };

    return (
      <div className={styles.container} data-tid="container">
        <TaskList />
        <Link style={linkStyles} to={routes.HOME}>
          Home (this page)
        </Link>
      </div>
    );
  }
}
