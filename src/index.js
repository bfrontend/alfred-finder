const argv = process.argv.slice(2)
const { promisify } = require('util')
const exec = promisify(require('child_process').exec);
function openFolder(folderPath) {
  const appleScript = `osascript -e '
    property the_path : "${folderPath}"
    set folderPath to (POSIX file the_path) as alias
    tell application "Finder"
      activate
    if window 1 exists then
      set target of front Finder window to folderPath
    else
      open folderPath
    end if
  end tell'`
  exec(appleScript, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log('打开成功');
  });
}

async function getPath() {
  const {error, stdout} = await exec(`autojump ${argv[0]}`, {env: {PATH: '~/.autojump/bin'}})
  if (error) {
    return Promise.reject(new Error(`exec error: ${error}`))
  }
  return stdout.replace(/(?:^\s+)|(?:\s+$)/g, '')
}

async function main() {
  const folderPath = await getPath()
  if (folderPath) {
    openFolder(folderPath)
  }
}
main()