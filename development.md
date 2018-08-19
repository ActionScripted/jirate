Development
===


Platforms
---
The goal is to support as many platforms as possible with as much shared code as possible. That's why we're using Electron for the main application and Python for NativeMessaging scripts (TaskWarrior runs on Windows using the Linux subsystem).

It's not easy trying to find documentation for proper cross-platform NativeMessaging and in practice we may need to adjust how we're doing things. Most examples use Python for the host while most published items use platform-specific hosts distributed as Objective C or Windows executable.


Wine on macOS
---

The official way to build Electron apps for Windows on non-Windows systems is a Docker container instead of fucking around with Wine locally: https://www.electron.build/multi-platform-build. That said, if you're fucking around with Wine, keep reading...

There are some issues with default Homebrew Wine and the issue for it has been permanently locked (unresolved) on GitHub. The gist of my understanding is that there's an architecture problem which can be side-stepped via `rm -rf ~/.wine; export WINEARCH=win32; wine notepad.exe` (notepad being good, included test exe). That'll setup Wine in 32-bit mode instead of 64-bit mode which seems to have issues. Maybe there's a way around this, maybe not. For now the fix is 32-bit and that's okay for Electron because it builds a 32-bit exe.

Setup Win32 on macOS w/winetricks:

```bash
brew cask install xquartz
brew install wine winetricks
export WINEARCH=win32
wine notepad.exe
```

Run Jirate via Wine:
```bash
cd electron
yarn package --arch=ia32 --platform=win32
wine out/jirate-win32-ia32/jirate.exe
```



Electron
---
_Created from [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)._Went from raw Electron to Electron-Forge to Electron React Boilerplate because the features/functionality out of the box were light years ahead...and SCSS files weren't working under Electron-Forge starter and troubleshooting that whole thing was more time-consuming than actual development.

cd electron
yarn
yarn start

for more commands check electron/package.json


NativeMessaging
---
Clone this repo
Setup virtualenv
Update Python requirements
    pip freeze > requirements.txt


WebExtension
---


Requirements
---
* Node/NPM
* Python 3

To-Dos
---
see [todos.md](todos.md)
