##Important Rakes
There are **2** important rakes in this application

The first creates the new set of headlines for NY Times ticker by getting the new day's content from Evan's api and then storing it in Mongo.
 
```bash
rake db:times_cron 
```
The second should be run each time javascript or css files are added/modified. The rake converts less and scss files to css and compiles all javascript and css according to the assets.yml [file](https://github.com/NYPL/census_app/blob/master/config/assets.yml) and moves the compiled (jammifyed - jammit) assets to [public/assets](https://github.com/NYPL/census_app/tree/master/public/assets). 

```bash
rake app:setup
```

##How to Update Streets
simply run this…
 
```bash
python scripts/streets_to.py 
```
from the app directory, then push to add/commit, push to github, push to heroku

##Pubsub

##How DV Kinda Works