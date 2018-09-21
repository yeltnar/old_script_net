`pm2.ts` starts `ws.ts` for each parser in `registered_parser.json` passing the location of the ws.json from the registered parser

`registered_parser.json` has a git url for a downloading of registered file if the required files are not all present _could have versions for this that would occasionally check if there is a update_

sub parser's `package.json` **must** describes how to compile the registered parser 
sub parser's `package.json` **must** describes how to install the registered parser 
sub parser's `package.json` **must** have a main value. This is what will be called by 
    _init function returns function to be called when parser triggers_


sub