Let's just say this bot does everything... including keep a conversation if you enable it's autochat feature :)

SETUP 1:
-----------------------------------------------------------------------
Create a discord text channel named "**mod-logs**"
**FOR:** Logging moderator command uses and server events (user join/leave/mute/unmute/kick/ban). 

Create a discord text channel named "**reaction-logs**"
**FOR:** Logging reaction role events (user join/leave role via reaction role) if you wish to log these events separately.

Create a discord text channel named "**reports**"
**FOR:** Logging reports from the `_report` command if you wish to log these events separately.

**NOTE:** These channels **require** the bot to have at least: 
`view channel, send messages, and embed links and mention` permissions.

SETUP 2:
-----------------------------------------------------------------------
Roles and Users **MUST** be given permission to access certain commands.

**USE:** `_help {command}` to view it's permission requirements.

**USE:** `_addmember {@role | roleID | @user | userID}` to add a role/user to access member commands.

**USE:** `_addmod {@role | roleID | @user | userID}` to add a role/user to access mod commands.

Administrator commands can only be accessed by server administrators.

**USE:** `_help` for a list of commands.

Use `_help {command}` to view information on a command. 

UPDATES: 
-----------------------------------------------------------------------
**ALL** automoderation will **DEFAULT** to disabled. To enable these tools **USE:**`_help auto-moderation`.
**Added:** Welcome messaging. **USE:** `_help welcoming` to view this.
**Added:** Autochat. **USE:** `_help autochat`
**Beta Testing:** Math. **USE:** `_help math`
________________________________________________________________________________
To clone and use ComicallyBot2.0 you will have to do a few things:
1. Install mongodb and compass for mongodb. Install Java v11 https://www.azul.com/downloads/zulu-community/?version=java-11-lts&os=&os=windows&architecture=x86-64-bit&package=jdk and lavalink from https://ci.fredboat.com/buildConfiguration/Lavalink_Build?branch=refs%2Fheads%2Fdev&mode=builds&guest=1 and click ![alt text](https://cdn.discordapp.com/attachments/418817098278764544/887838713500024832/unknown.png) Place lavalink .zip contents into a lavalink folder inside the project.
2. Create a .env file with a "TOKEN" for a discord token, "STEAM" for steam API key, "ERELA" for erela password, and "USERID" for discord User ID for owner commands
3. Create a application.yml file inside lavalink ex: https://github.com/stuyy/Lavalink-Discordpy-Example/blob/master/application.yml
4. npm i --save
5. To start the bot correctly use: "start.bat" or open /lavalink/start.bat and then "node ." in project directory
6. Commands will default to enabled. So use `_help Command` for more information
7. Auto-Moderation features will default to disabled. So use `_help Auto-Moderation`  for more information
8. Create a discord text channel named "mod-logs" for logging moderator command uses and "reports" for report command
9. Use _help {command} to view information on a command. Use _status to show the status of commands
10. Use `_addmember {@role | roleID | @user | userID}` to add a role/user to access member commands
11. Use `_addmod {@role | roleID | @user | userID}` to add a role/user to access mod commands
12. Administrator commands can only be accessed by server administrators
________________________________________________________________________________
Differences for Mac/Linux users:
1. Install Java v11 or higher https://www.azul.com/downloads/zulu-community/?&version=java-11-lts&os=&os=macos&architecture=x86-64-bit&package=jdk
2. "Chmod u+x ./start.sh"
3. To start the bot correctly use "./start.sh" then add a new terminal to use "node ."