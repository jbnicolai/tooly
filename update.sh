grunt build
git add -A

if [ "$1" != "" ]; then
  git commit -m "$1"
else
  git commit -m "-auto-"
fi

git push -u origin master