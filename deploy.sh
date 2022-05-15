hexo g
cp .gitignore favicon.ico public/
echo "cp .gitignore images/favicon16.png images/favicon32.png public/"
hexo d
hexo clean
rm -rf .deploy_git
rm db.json
git checkout db.json
