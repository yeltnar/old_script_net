if( process.argv[0].includes("starter_files") ){
    console.error("Don't run from starter_files folder. Run from newly created folder");
    process.exit(-1)
}

const app_name = process.argv[2];
if( app_name ){
    console.log("node `"+app_name+"`");
}else{
    console.error("app_name required as $1");
    process.exit(-1);
}

const fs = require('fs');

const default_app_file_location = "./default_app_name.ts";
const default_app_contents = fs.readFileSync(default_app_file_location).toString();
const new_file_contents = default_app_contents.split("{{{default_app_name}}}").join("\""+app_name+"\"");
fs.writeFileSync( default_app_file_location, (new_file_contents) );

const _package_json = fs.readFileSync("./package.json").toString();
console.log("_package_json")
console.log(_package_json)
//const package_jso = JSON.parse( _package_json );

// package_jso.name = app_name;
// package_jso.description = app_name;
// package_jso.main = app_name+".ts";

// package_jso.test = "ts-node "+package_jso.main;