// @flow
import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';

import styles from 'Components/TaskList.scss';
import Task from 'Components/Task';

const shellEnv = require('shell-env');
const shellPath = require('shell-path');
const { spawn } = require('child_process');

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

  const TaskListPosed = posed.ul({
    enter: {
      staggerChildren: 100
    }
  });

  const TaskListItems = tasks.map(task => (
    <Task key={task.id} description={task.description} isActive />
  ));

  return (
    <PoseGroup animateOnMount>
      <TaskListPosed key="tasklistposed" className={styles.base}>
        {TaskListItems}
      </TaskListPosed>
    </PoseGroup>
  );
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
    return tasks.length ? <TaskList tasks={tasks} /> : <TaskListPlaceholder />;
  }
}
