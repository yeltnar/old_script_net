if( process.argv[0].includes("starter_files") ){
    console.error("Don't run from starter_files folder. Run from newly created folder");
    process.exit(-1)
}

const app_name = process.argv[2];
if( app_name ){
    console.log("app_name='"+app_name+"'");
}else{
    console.error("app_name required as $1");
    process.exit(-1);
}

const fs = require('fs');

const source_str = "{{{default_app_name}}}";

replaceFileContents("./default_app_name.ts", source_str, "\""+app_name+"\"")
//replaceFileContents("./package.json", source_str, app_name+".ts")

const package_json_str = fs.readFileSync("./package.json").toString();
const package_obj = JSON.parse( package_json_str==="" ? "{}" : package_json_str );

package_obj.name = app_name;
package_obj.description = app_name;
package_obj.main = app_name+".ts";
package_obj.test = "ts-node "+package_obj.main;

fs.writeFileSync( "./package.json", JSON.stringify(package_obj, null, 2) );

function replaceFileContents(file_name, source_str, replace_str){

    const default_app_contents = fs.readFileSync(file_name).toString();
    const new_file_contents = default_app_contents.split(source_str).join(replace_str);
    fs.writeFileSync( file_name, (new_file_contents) );
}