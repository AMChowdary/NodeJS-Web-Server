# NodeJS-Web-Server
Using NodeJS to implement web-server which hosts and serves files.

Requirements:

• Use standard http module or express framework to implement simple web- server;

• Use fs module to create/modify/read files in file system;

• Write every request info to logs;

• Application should support log, txt, json, yaml, xml, js file extensions ( consider filename may contain '.' symbol);

• Please check that your app can be launched with 'npm install' and 'npm start' commands just after git pull;

• Application should work at port 8080.

Acceptance criteria:

• Server saves file on createFile request and responds with 200 status, use ‘filename' and ‘content’ body params to transfer file data.

• Server returns list of uploaded files on getFiles request

• Server returns file content on getFile request, use 'filename' url parameter to determine what file you want to retrieve.

• In case there are no file with provided name found, return 400 status.

Optional criteria:

• Server handles errors and validates input params for all requests.

• You can add password protection for files, with additional(optional) parameter 'password' in createFile request, and additional(optional) parameter ‘password' in getFile request in url query params. Consider server should handle invalid and empty password for protected files.

• Ability to modify files content (additional endpoint);

• Ability to delete files (additional endpoint);
