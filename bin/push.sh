echo "\n"
echo "push start"
echo "\n"
git add .
git status
commitMsg='atuo commit'
if [ -n "$1" ]; then
    commitMsg=$1
fi
git commit -m "$commitMsg"
git push
echo "\n"
echo "push end"
echo "\n"
