echo "start"
echo $PWD
hexo g
cp ./readme.md ./public/
hexo d
hexo clean
