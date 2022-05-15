hexo g
cp .gitignore favicon16.png favicon32.png public/
echo "cp .gitignore favicon16.png favicon32.png to public/"
hexo d
hexo clean
rm -rf .deploy_git
rm db.json
git checkout db.json
