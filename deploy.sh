echo "start"
echo $PWD
hexo generate
cp ./README.md ./public/
hexo deploy
hexo clean
