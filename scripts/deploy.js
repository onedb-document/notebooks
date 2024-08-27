const { execSync } = require("child_process")

function main() {
  execSync("yarn")
  execSync("cross-env NODE_ENV=prod vitepress build docs")
  console.log('打包成功')
  execSync("rm -r public")
  execSync(`cp -r docs/.vitepress/dist/ public/`)
  console.log('开始netlify部署')
  execSync(`netlify deploy --build --prod --site=api-wdb`)
  console.log('开始git提交')
  execSync(`git add .`)
  execSync(`git commit -m "update"`)
  execSync(`git push`)
  console.log("deploy success!!!")
}

main()
