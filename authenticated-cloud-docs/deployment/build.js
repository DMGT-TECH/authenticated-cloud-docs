const util = require('util');
const exec = util.promisify(require('child_process').exec);
const stat = util.promisify(require('fs').stat);

async function run() {

  const {err, stats} = await stat("./tmp")
  if (err) {
    console.log("Installing docusaurus.")
    const installCmd = "npx @docusaurus/init@latest init tmp classic"
    const { stdout, stderr } = await exec(installCmd);
  } else {
    console.log("Assuming docusaurus already installed (./tmp aleady exists).")
    const steps = [
      {"configure_docusaurus": "cp ../config/docusaurus/docusaurus.config.js ./tmp"},
      {"remove_index.js"     : "cd ./tmp; rm ./src/pages/index.js"},
      {"copy_content"        : "cd ./tmp; rm -rf docs; cp -r ../../docs ./docs"},
      {"build_static_site"   : "cd ./tmp; npm run build"},
    ]
    for (step of steps) {
      const name = Object.keys(step)
      const code = step[name]
      console.log("Executing step " + name)
      const { stdout, stderr } = await exec(code);
    }
  }

}

run()
