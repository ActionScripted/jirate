Jirate
===

Browser-based task/time management for JIRA. Leans on TimeWarrior and friends to automatically manage tasks/time and adds start/stop timer buttons to JIRA tasks.

WebExtension using NativeMessaging API to talk to a Python endpoint that provides local TaskWarrior information. Adds timer UI to JIRA so you can stop/start timers for TaskWarrior tasks. It's a lot to setup and pretty damn manual but it stands on the shoulders of one of the best open-source task management systems and doesn't cost anything to run.

Maybe someday this'll get moved out into an Electron app or something. The real reason this was made was to add start/stop/whatever timer UI to JIRA.

If you're reading this, you're trolling the Git history and that's fucking awesome. Thanks for even looking at this.


Setup
---
* Install and configure requirements
* Install WebExtension
* Setup NativeMessaging endpoint
* Open JIRA and start a timer! Start/stop timers on tasks from the extension menu.


Development
---
Clone this repo
Setup virtualenv
Update Python requirements
    pip freeze > requirements.txt


Requirements
---
* TaskWarrior
* TimeWarrior
* BugWarrior
* JIRA
* Python 3
