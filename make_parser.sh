app_name=$1
if [ -z ${app_name} ];then 
    echo "app_name is unset"; 
    exit -1
else 
    echo "app_name is set to '$app_name'"; 
fi


cp -r starter_files $app_name
echo "cp done"

cd $app_name
echo $(pwd)

mkdir "config"
cd config
echo {} > local.json
echo {} > default.json
echo {} > default-0.json
cd ..

log=$(node init.js $app_name)
echo $log

 mv default_app_name.ts $app_name".ts"

 echo "---------------------------------------------------------------------"
 ls

echo " "
 cd config
 pwd
 ls
 cd ..
 echo " "
 
 cat "package.json"

 echo " "

# clearn up for testing
# cd ..
# rm -rf $app_name
# echo "cleanup done"

# rm -rf test123