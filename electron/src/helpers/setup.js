const fs = require('fs-extra');
const os = require('os');
const path = require('path');


const createManifestFile = async (base, dir) => {
  const manifest = path.format({ base, dir });

  fs.open(manifest, 'w')
    .then(fs.close);
};

const setupNativeMessagingFirefox = async () => {
  const base = 'jirate-8675309.json';
  const plat = process.platform;

  let dir = '';

  // Windows install
  if (plat.match(/^win*/)) {
    // ... registry keys for NativeMessage
  } else {
    // macOS install
    if (plat === 'darwin') {
      dir = path.join(
        os.homedir(),
        'Library',
        'Application Support',
        'Mozilla',
        'NativeMessagingHosts',
      );
    // Linux(-ish) environment
    } else {
      dir = path.join(
        os.homedir(),
        '.mozilla',
        'native-messaging-hosts',
      );
    }

    createManifestFile(base, dir);
  }
};

export default async () => {
  // Install manifests for Firefox
  setupNativeMessagingFirefox();
};
