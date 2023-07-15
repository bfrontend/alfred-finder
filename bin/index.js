#!/usr/bin/env node
(()=>{var t={81:e=>{"use strict";e.exports=require("child_process")},837:e=>{"use strict";e.exports=require("util")}},o={};function s(e){var r=o[e];return void 0!==r||(r=o[e]={exports:{}},t[e](r,r.exports,s)),r.exports}{const i=process.argv.slice(2),e=s(837)["promisify"],a=e(s(81).exec);!async function(){var e=await async function(){var{error:e,stdout:r}=await a("autojump "+i[0]);return e?Promise.reject(new Error("exec error: "+e)):r.replace(/(?:^\s+)|(?:\s+$)/g,"")}();e&&(e=e,a(`osascript -e '
    property the_path : "${e}"
    set folderPath to (POSIX file the_path) as alias
    tell application "Finder"
      activate
    if window 1 exists then
      set target of front Finder window to folderPath
    else
      open folderPath
    end if
  end tell'`,(e,r,t)=>{e?console.error("exec error: "+e):console.log("打开成功")}))}()}})();