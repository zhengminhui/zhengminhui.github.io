hexo g
cp ./readme.md ./public/
hexo d
hexo clean
rm -rf .deploy_git
rm db.json
git checkout db.json
