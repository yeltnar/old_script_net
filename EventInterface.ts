enum RunMode {
    "production" = 0,
    "development",
    "test",
    "listener"
}

// Device info
interface ResponseDevice{
    "name":string,
    "group":string,
    "git_hash":string
}
interface RegisteredDevice extends ResponseDevice{
    "token":string,
    "express_string":string,
    "run_mode":RunMode
}


// Event contents
interface EventContents {
    "uuid":string
}
interface HttpEventContents extends EventContents{
    request_body:object,
    request:object,
}

// Response contents // extend this for different returns 
interface ResponseContents{
    "value":{},
    "logs":Array<string>
}
interface HttpResponseContents extends ResponseContents{

    "response_info":{ // info for express response

        "attachment":string, // path to attachment file, or if blank only Content-Disposition: attachment
        "download":{
            "path":string,
            "file_name"?:string
            "options":object
        },
        "end":boolean, // should call `.end()` or only `.append()`
        "json":boolean, // will call the json function 
        "jsonp":boolean, // will call the jsonp function 
        "redirect":string, // redirects to provided endpoint
        "headers":Array<{field:string, value:string}>, // http response headers _res.set()_
        "status_code":number, // http response status code
        "type":string
        // "cookie": // :shrug:
    }
}


// Event interfaces 
interface EventInterface {

    "meta":{
        "event_name":string,
        "target_device"?:string,
        "target_group"?:string,
        "date":Date,
        "touched_by":[ResponseDevice],
        "run_mode":RunMode,
        "retry":{
            "times":number,
            "times_tries":number, // should be set to 0 at init
            "frequency":number, // number of ms
        }
    },
    "event_contents":EventContents,
    "is_done":Boolean,
    "result"?:ResponseContents
}
interface HttpEventInterface extends EventInterface{
    "event_contents":HttpEventContents
}


// sample implementations 
const event_interface:EventInterface = {

    meta:{
        event_name:"not_http_request",
        date:new Date(),
        touched_by:[{
            "name":"sample_name",
            "group":"group",
            "git_hash":"sample_git_hash"
        }],
        run_mode: RunMode.development
    },
    result:{
        value:{},
        logs:[]
    },
    event_contents:{
        uuid:"fallback_uuid"
    },
    is_done:false
};

const http_interface:HttpEventInterface = {
    meta:{
        event_name:"http_request",
        date:new Date(),
        touched_by:[{
            "name":"sample_name",
            "group":"group",
            "git_hash":"sample_git_hash"
        }],
        run_mode: RunMode.development
    },
    event_contents:{
        request_body:{},
        request:{},
        uuid:"uuid_stub_here"
    },
    result:{
        value:{},
        logs:[]
    },
    is_done:false
};

const http_interface_bad = {
    meta:{
        event_name:"http_request",
        date:new Date(),
        touched_by:[{
            "name":"sample_name",
            "group":"group",
            "git_hash":"sample_git_hash"
        }]
    },
    event_contents:{
        request_body:{},
        request:{},
        uuid:"uuid_stub_here"
    },
    result:{
        value:{},
        logs:[]
    }
};

let x:HttpEventInterface = JSON.parse(JSON.stringify(http_interface_bad));

console.log( x.is_done )