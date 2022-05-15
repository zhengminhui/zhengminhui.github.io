hexo g
cp .gitignore favicon.ico public/
echo "cp .gitignore favicon.ico public/"
hexo d
hexo clean
rm -rf .deploy_git
rm db.json
git checkout db.json
