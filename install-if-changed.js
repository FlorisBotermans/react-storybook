const fs = require('fs')
const path = require('path');
const crypto = require('crypto');
const execSync = require('child_process').execSync;

// hashes a given file and returns the hex digest
const hashFile = (filepath) => {
  const hashSum = crypto.createHash('md5');
  const contents = fs.readFileSync(filepath, 'utf-8');
  hashSum.update(Buffer.from(contents));
  return hashSum.digest('hex');
}

// runs npm install if package-lock.json has changed
const installIfChanged = () => {
  const packageLockPath = path.join(__dirname, 'package-lock.json');
  let packageLockExists = fs.existsSync(packageLockPath);
  if (!packageLockExists) {
    console.warn('Cannot find package-lock.json');
  }
  let currentDigest = packageLockExists ? hashFile(packageLockPath) : undefined;
  
  const packageLockHashPath = path.join(path.dirname(packageLockPath), 'node_modules/.cache/install-if-changed/package-lock.json.md5');
  let packageLockHashExists = fs.existsSync(packageLockHashPath);
  const previousDigest = packageLockHashExists ? fs.readFileSync(packageLockHashPath, 'utf-8') : undefined;

  // if the hash file doesn't exist
  // or if it does and the hash is different
  if (!packageLockExists || !packageLockHashExists || previousDigest !== currentDigest) {
    console.log(`Executing 'npm install' because package-lock.json ${fs.existsSync(packageLockPath) ? 'has been modified' : 'does not yet exist'}`)

    try {
      const start = performance.now();
      execSync('npm install', { stdio: 'inherit' });
      console.log(`Finished 'npm install' after ${(Math.round(performance.now() - start) / 10) / 100}s`);

      if(!currentDigest) {
        packageLockExists = fs.existsSync(packageLockPath);
        if(!packageLockExists) {
          throw new Error(`No ${packageLockPath} was created after \`npm install\``);
        }

        currentDigest = hashFile(packageLockPath);
      }

      fs.mkdirSync(path.dirname(packageLockHashPath), { recursive: true });
      fs.writeFileSync(packageLockHashPath, currentDigest); // write to hash to file for future use
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
    return;
  }

  console.log('Skipping npm install because package-lock.json has not been modified.');
}

installIfChanged();