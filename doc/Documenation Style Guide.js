-------------------------
-------------------------
Documenation Style Guide
-----by nlamasol---------
-------------------------

Below is the command you should run to generate an api of all relevant files

apidoc -i views/ -i routes/ -i js/ -f ".*\\.js$"

Everything below this is an explanation of how to run different versions of
the apidoc command. if you want to learn what a documentation should look like
skip to line 70

I want to specify other folders:

Basically append any significant folders to the end using:

  -i folderName/maybeAnotherlevel/....

But Nic I need to append a file in the root folder!

Dont. Due to how Apidoc works if you specify nothing or the root folder it
will grab all folders that are subdirectories/subfolders of root and that is litterally
all the files in the project.

Basically the api will look like shit because
of extraneous files that dont follow the format we want.

How does one deal with this then?

Do not have code that needs documentation in the root folder
Categorize. Store js scripts in a js folder.


More Complex ApiDoc Calls
-------------------------

Okay I want apidoc to only look at a specific file how does one that?

apidoc -f ".nameoffile.filetype"

Okay I want apidoc to only look at files that have a specific file type how is
that done?

Wonderful question whoever you are! Here is how you would specify you want
only .js files:

apidoc -f ".*\\.js$"

Replace the .js with whatever you want

----------------------------------------
More Examples of 'complex' apidoc calls
----------------------------------------

apidoc -i routes/ -i doc/ -f ".*\\.js$"

for all files in routes and doc that end in .js

apidoc -i routes/ -i doc/ -f ".*\\.js$" -f ".*\\.html$"

for all files in routes and doc that end in .js or .html
If this ever different from just "\\.js$" this means that we are coding badly

apiddoc -i routes/ -i doc/ -f ".foo.js" -f ".bar.js"

for all files in routes and doc that are named foo.js or bar.js

------------------------------------
What documentation should look like
------------------------------------

Below is what a Function should have for its documentation

/**
 *
 * @api {get} /object/:functionCall functionName
 * @apiDescription Description/the purpose of the function.
 * @apiName uniqueNameTagForFunctionThisDoesNotShowUpOnThePage
 * @apiGroup ObjectNameorWhatThisMethodIsAPartOf
 *
 * @apiParam {Type} paramterName description of the variable
 * @apiParam {Int} paramInt an example variable.
 *
 * @apiSuccess {Type} returnVar variable or thing that is returned from function
 *
 * @apiError NameOfError how the error occurs.
 *
 */



