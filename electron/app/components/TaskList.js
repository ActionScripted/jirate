// @flow
import React, { Component } from 'react';
import styles from './TaskList.scss';

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
  const taskList = tasks.map(task => (
    <li className={styles.tasklist__task} key={task.id}>
      {task.description}
    </li>
  ));

  return <ul className={styles.tasklist}>{taskList}</ul>;
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

    const tw = spawn('task', ['status:pending', 'export'], {
      env: shellEnv.sync(),
      shell: true
    });

    let twLog = '';

    tw.stdout.on('data', data => {
      twLog += data.toString();
    });

    tw.stdout.on('close', () => {
      this.setState({
        tasks: JSON.parse(twLog)
      });
    });

    tw.stderr.on('data', data => {
      // TODO: handle stderr output
      console.log(`stderr: ${data}`);
    });

    tw.on('close', code => {
      // TODO: handle spawn close
      console.log(`child process exited with code ${code}`);
    });
  }

  render() {
    const { tasks } = this.state;

    if (tasks.length) {
      return <TaskList tasks={tasks} />;
    }

    return <TaskListPlaceholder />;
  }
}
