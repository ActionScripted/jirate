// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.scss';

const { spawn } = require('child_process');
const shellPath = require('shell-path');
const shellEnv = require('shell-env');

type Props = {};
type State = {
  tasks: Array<Object>
};

type TaskListProps = {
  tasks: Array<Object>
};

function TaskListPlaceholder() {
  return <p>Loading tasks...</p>;
}

function TaskList(props: TaskListProps) {
  const { tasks } = props;
  const taskList = tasks.map(task => <li key={task.id}>{task.description}</li>);

  return <ul>{taskList}</ul>;
}

function Tasks(props: TaskListProps) {
  const { tasks } = props;

  if (tasks.length) {
    return <TaskList tasks={tasks} />;
  }

  return <TaskListPlaceholder />;
}

export default class Home extends Component<Props, State> {
  props: Props;

  state: State;

  constructor(props?: Props) {
    super(props);

    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    // TODO: move this shit
    // get task warrior stuff
    // update state

    process.env.PATH =
      shellPath.sync() ||
      [
        './node_modules/.bin',
        '/.nodebrew/current/bin',
        '/usr/local/bin',
        process.env.PATH
      ].join(':');

    const tw = spawn('task', ['export'], { env: shellEnv.sync(), shell: true });
    let twLog = '';

    tw.stdout.on('data', data => {
      console.log('Getting data...');
      twLog += data.toString();
      console.log(twLog);
    });

    tw.stdout.on('close', () => {
      console.log('Getting data...DONE');
      console.log(twLog);
      this.setState({
        tasks: JSON.parse(twLog)
      });
    });

    tw.stderr.on('data', data => {
      console.log(`stderr: ${data}`);
    });

    tw.on('close', code => {
      console.log(`child process exited with code ${code}`);
    });
  }

  render() {
    const { tasks } = this.state;

    return (
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        <Tasks tasks={tasks} />
        <Link to={routes.HOME}>Home (this page)</Link>
      </div>
    );
  }
}
