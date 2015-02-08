module.exports = 
'/*!\n' +
' * <%= pkg.name %> - version <%= pkg.version %> (built: <%= grunt.template.today("yyyy-mm-dd") %>)\n' +
' * <%= pkg.description %>\n' + 
' *\n' + 
'<%= cust %>\n' + 
' *\n' + 
' * <%= pkg.repository.url %>\n' +
' *\n' +  
' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
' * Licensed under the <%= pkg.license.type %> license.\n' +
' * <%= pkg.license.url %>\n' +
' */\n';
