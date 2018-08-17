import React from 'react';

const { spawn } = require('child_process');

function TaskListPlaceholder() {
  return (
    <p>Loading tasks...</p>
  );
}

function TaskList(props) {
  const tasks = props.tasks;
  const taskList = tasks.map((task) =>
    <li key={task.id}>
      {task.description}
    </li>
  );

  return (
    <ul>{taskList}</ul>
  );
}

function Tasks(props) {
  if (props.tasks.length) {
    return <TaskList tasks={props.tasks} />;
  }
  return <TaskListPlaceholder />;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    // get task warrior stuff
    // update state

    const tw = spawn('task', ['export']);
    let twLog = '';

    tw.stdout.on('data', (data) => {
      twLog += data.toString();
    });

    tw.stdout.on('close', () => {
      this.setState({
        tasks: JSON.parse(twLog),
      });
    });

    tw.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    tw.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });

    /*
    setTimeout(() => {
    }, 1000);
    */
  }

  render() {
    return (<div>
      <h2>Welcome to Jirate!</h2>
      <Tasks tasks={this.state.tasks} />
    </div>);
  }
}
