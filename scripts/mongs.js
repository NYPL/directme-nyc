db.locations.ensureIndex({"token": 1}, {background: true, unique: true});
db.loaders.ensureIndex({"borough": 1}, {background: true, unique: true});
db.stories.ensureIndex({"result_token": 1}, {background: true, unique: false});
db.runCommand({"convertToCapped": "usersessions", size: 100000});
db.user_sessions.ensureIndex({"session": 1}, {background: true, unique: false});
db.user_sessions.ensureIndex({"connection": 1}, {background: true, unique: false});