app_name=$1
if [ -z ${app_name} ];then 
    echo "app_name is unset"; 
    exit -1
else 
    echo "app_name is set to '$app_name'"; 
fi


cp -r starter_files $app_name

# clearn up for testing
# cd ..
# rm -rf $app_name
# echo "cleanup done"

# rm -rf test123