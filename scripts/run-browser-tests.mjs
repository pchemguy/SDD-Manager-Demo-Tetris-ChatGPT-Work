/** Run the standard suite using an explicitly provisioned task browser; never changes product builds. */
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const cache=path.resolve(process.env.TETRIS_BROWSER_CACHE??'node_modules/.cache/tetris-browser');
const config=JSON.parse(fs.readFileSync(path.join(cache,'config.json'),'utf8'));
const result=spawnSync('npm',['run','test:e2e','--',...process.argv.slice(2)],{stdio:'inherit',env:{...process.env,TETRIS_CHROMIUM_PATH:config.executablePath,TETRIS_CHROMIUM_ARGS:JSON.stringify(config.args),FONTCONFIG_PATH:config.fontPath}});
process.exitCode=result.status??1;
