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
The **Publisher-Subscriber Pattern**, aka **Observer Pattern** is covered extremely well in the following sources (and better than my simpleton explanations):
[Javascript Playground](http://javascriptplayground.com/blog/2012/04/a-jquery-pub-sub-implementation)
[Gist, Jquery Tiny PubSub](https://gist.github.com/661855)
[Addy Osmani's JS Design Pattern Book - work in progress](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript)


##How DV Kinda Works
###Notes
- This is a modified version of the [original](https://github.com/documentcloud/document-viewer). Things are missing. That's ok.
- I've removed search and other elements/files, since we either we didn't use the feature or modified/changed it.
- You should probably use/learn/know about [underscore.js](http://underscorejs.org/)
- Understand javascript [prototypes](http://javascriptweblog.wordpress.com/2010/06/07/understanding-javascript-prototypes/) & [constructors](http://phrogz.net/js/classes/OOPinJS2.html)
- *helpers* are similar to Rails helpers… methods to get shiz done.
- Like any MVC system, these *models* contain default methods and initialized variables for the object. 

We'll go file by file that's not a vendor file or view, which are more self-explanatory.

 

#### [/controllers/api.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/controllers/api.js)
This remains untouched from the original DV repo. Basically, this file allows for easy-to-use methods for getting page numbers, changing modes, etc…

####[/controllers/api_extend.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/controllers/api_extend.js)
This is me extending the API… which is good practice… for the methods we needed for Census. The methods added are just publisher methods, which our own modules are subscribed to.
	
	updateMag() => refers to the publisher event when a new set of DV pages were loaded.
	This let our jloupe module know to change the image urls.
	
	dragState() => refers to the publisher even when someone drags through the DV pages.

####[/controllers/document_viewer.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/controllers/document_viewer.js)
**Super Important File**

This file contains the instantiations of models, the api, this local version of Jquery, everything. It also contains the JsonLoader, specific to DV.

####[/elements/elements.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/elements/elements.js)
I've modified this to fit our specific elements, but this file is used to cache DOM elements that pertain to the DV.

####[/events/events.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/events/events.js)
This file contains the event methods that draw DV pages to the screen and that set the zoom levels (range).

The ranges variable, shown below, takes in ranges that are set in the [document model](https://github.com/NYPL/census_app/blob/master/public/js/DV/models/document.js)

```javascript
	var ranges = viewer.models.document.ZOOM_RANGES;
```

####[/events/history.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/events/history.js)
This file contains all the history and pushState methods for DV. If you need a refresher on pushState and browser history, see [this](https://developer.mozilla.org/en/DOM/Manipulating_the_browser_history/). We use history events on *DirectMe* in order to restore the page of the viewer on back/forward events. 

####[/events/navigation.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/events/navigation.js)
Deals with expander and annotation nav events, not really modified or used in *DirectMe*

####[/events/ViewAnnotation.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/events/ViewAnnotation.js), [/events/ViewDocument.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/events/ViewDocument.js), [/events/ViewThumbnails.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/events/ViewThumbnails.js)
These files refer to next and previous events for the three types of views (Annotation view, Document view, and Thumbnail view).

####[/helpers/annotations.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/helpers/annotations.js)
Helper methods for annotations. Not touched on *DirectMe*. 

####[/helpers/construction.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/helpers/construction.js)
**Super Important File**

This is where JST templates are called and much of the DV and its various components rendered for display.

####[/helpers/editor.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/helpers/editor.js)
This file refers to a browser editor for DV. Not used on **DirectMe**. You can see it in action on DocumentCloud's app.

####[/helpers/helpers.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/helpers/helpers.js)
**Super Important File**

This is where most click/move/release (interactive) events are bound to DOM elements and instantiated. **bindEvents** being the key method to look at. 

####[/helpers/navigation.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/helpers/navigation.js)
Mostly refers to Chapters and Annotations, extends the helper object within DV.Schema.

####[/lib/annotation.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/lib/annotation.js)
The key DV.Annotations object, extending its prototype.

####[/lib/drag_reporter.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/lib/drag_reporter.js)
Creates and Extends the prototype of DV.DragReporter object, which reports drag & mouse positions. 

####[/lib/elements.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/lib/elements.js)
Creates and Extends the DV.Elements prototype to get an element.

####[/lib/history.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/lib/history.js)
Creates and Extends the prototype of the DV.History object for saving, registering, and loading state. This is a well commented piece of a code.

####[/lib/initializer.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/lib/initializer.js)
Initializes the DV namespaces.

####[/lib/page.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/lib/page.js)
**Super Important File**

Creates and Extends the prototype of the DV.Page object. I manipulated the drawImage method on the prototype, adding information for the magnified image url and changing parts of the to-be rendered html in the view.

	base.api.updateMag(jQuery, 'pages') => a call to the api (base references the viewer object) 
	in order to publish an event when a new set of images is lazy-loaded. 
	Remember, images (each document) are lazy-loaded in 3's, by default, in DV.
	

####[/lib/page_set.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/lib/page_set.js)
**Super Important File**

Creates and Extends the prototype of the DV.pageset object. This is where the set of 3 images per load is set (**function - redraw**) and much of the zoom math is done (**function - zoom**)

####[/lib/thumbnails.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/lib/thumbnails.js)
**Super Important File**

This is where much of the Thumbnails magic happens. This deserves are more in-depth discussion.

####[/models/annotation.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/models/annotation.js)
The model object for Annotations.

####[/models/chapter.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/models/chapter.js)
The model object for Chapters.

####[/models/document.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/models/document.js)
**Super Important File**

The model object for the entire Document. This is where all Document specific variables and methods are set (at default, modified later), like **ZOOM_RANGES**, **state**, and **currentPageIndex**.

####[/models/page.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/models/page.js)
**Super Important File**

This refers to the model object, representing the set of pages in the document, containing the image sources for each page, and the page properties. **imageURL** is a method that returns the complete image URL for a particular page.

####[/schema/schema.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/schema/schema.js)
**Super Important File**

The creates and extends the prototype of to the schema object of the viewer. The schema incorporates the models, views, states, helpers, events, elements, text, and data objects of the viewer.

	DV.Schema.prototype.importCanonicalDocument = function(json) {…} => Imports the document's JSON representation 
	into the DV.Schema form that the models expect.

####[/states/states.js](https://github.com/NYPL/census_app/blob/master/public/js/DV/states/states.js)
**Super Important File**

This sets the states of the Viewer, which fall into Annotation, Document, and Thumbnails. Additionally, this file contains the state object's method for the initial loading of a document and what methods are called at init-load time.

