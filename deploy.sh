echo "start"
echo $PWD
npm install hexo
hexo generate
cp ./README.md ./public/
hexo deploy
hexo clean
vercel --prod
