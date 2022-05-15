hexo g
mv .gitignore favicon.ico public/
hexo d
hexo clean
rm -rf .deploy_git
rm db.json
git checkout db.json
