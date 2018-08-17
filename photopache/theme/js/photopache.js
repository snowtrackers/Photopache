/**
 * Created by thomas on 20/03/16.
 */

function Photopache ()
{
	/**
	 * @type {Array} List of photos
	 */
	this.photos = [];

	/**
	 * @type {Array} List of directories
	 */
	this.directories = [];

	/**
	 *
	 * @type {number} Total of columns find in generatePage
	 */
	this.totalColumns = 0;

	this.init();

	return this;
}

Photopache.prototype =
{
	/**
	 * Initiate datas and clear page
	 */
	init: function()
	{
		var that = this;
        document.querySelectorAll("td.indexcolname > a").forEach(function(item, index)
		{
			if(index === 0)
			{
				return;
			}

			if( ! item.innerText.match("\.[a-zA-Z]+$"))
			{
				that.directories.push( item.innerText );
			}
			else if( ! item.innerText.match("-thumbnail\.[a-zA-Z]+$"))
			{
				that.photos.push( item.innerText );
			}
		});

		document.getElementById("indexlist").remove();
	},

	/**
	 * Replace in name - and _ by a space and remove file extension
	 * @param name The name you want to parse
	 * @returns {string} Name formatted
	 */
	clearName: function(name)
	{
		return name.replace(/[-_]/g, " ").replace(/\.[a-zA-Z0-9]+/, "");
	},

	/**
	 * Load the picture by it's id and load it in modal
	 * @param id The i of array of photos (thumbnails list)
	 */
	loadImageInModal: function(id)
	{
		id = parseInt(id);
		document.getElementById("modal-title-content").innerText = this.clearName(this.photos[parseInt(id)]);
		document.getElementById("modal").setAttribute("data-id", id);
		document.getElementById("modal").style.backgroundImage = "url(" + encodeURI(this.photos[parseInt(id)]) + ")";

		var myNewId = parseInt(id);
		if(id === 0)
		{
			document.getElementById("modal-next").setAttribute("data-load", myNewId + 1);
            document.getElementById("modal-previous").setAttribute("data-load", this.photos.length - 1);
		}
		else if(id === this.photos.length - 1)
		{
            document.getElementById("modal-next").setAttribute("data-load", 0);
            document.getElementById("modal-previous").setAttribute("data-load", myNewId - 1);
		}
		else
		{
            document.getElementById("modal-next").setAttribute("data-load", myNewId + 1);
            document.getElementById("modal-previous").setAttribute("data-load", myNewId - 1);
		}
	},

	/**
	 * Generate thumbnail link with encoding (spaces create bug)
	 * @param link Actual picture link
	 * @returns {string}
	 */
	findThumbail: function(link)
	{
		return encodeURI(link.replace(/(\.[a-zA-Z]+)$/, function(v) { return "-thumbnail" + v; }));
	},

	/**
	 * Generate column from pure css organisation body
	 */
	generatePage: function()
	{
		var myNodeContent = document.createElement("div");
		myNodeContent.classList.add("content");

		this.totalColumns = 16;
		var myScreenWidth = window.innerWidth;
		if(myScreenWidth <= 1920)
		{
			this.totalColumns = 12;
			if(myScreenWidth <= 1600)
			{
				this.totalColumns = 6;
				if(myScreenWidth <= 1336)
				{
					this.totalColumns = 4;
					if(myScreenWidth <= 1024)
					{
						this.totalColumns = 2;
						if(myScreenWidth <= 640)
						{
							this.totalColumns = 2;
							if(myScreenWidth <= 480)
							{
                                this.totalColumns = 1;
							}
						}
					}
				}
			}
		}

		for(var i = 0; i < this.totalColumns; i++) {
		    var myColumn = document.createElement("div");
		    myColumn.classList.add("content-column");
		    myNodeContent.appendChild( myColumn );
		}

        document.body.appendChild( myNodeContent );

		document.getElementById("menu").addEventListener("touchend", function (ev) {
			if( this.classList.contains("open") ) {
				this.classList.remove("open");
			}
			else {
				this.classList.add("open");
			}
		}, false);
	},

	/**
	 * Generate content from left menu
	 */
	generateDirectories: function()
	{
	    var myMasterNode = document.getElementById("menu-list");
		for(var cpt = 0; cpt < this.directories.length; cpt++) {

            var myItemIcon = document.createElement("div");
            myItemIcon.classList.add("menu-icon");
            myItemIcon.innerHTML = "&#x1F4C1;";
            var myItemText = document.createElement("div");
            myItemText.innerText = this.directories[cpt].substr(0, this.directories[cpt].length - 1);
            myItemText.classList.add("menu-text");

            var myItemLink = document.createElement("a");
			myItemLink.href = this.directories[cpt];
            myItemLink.classList.add("menu-entry");
            myItemLink.appendChild( myItemIcon );
            myItemLink.appendChild( myItemText );

            myMasterNode.appendChild( myItemLink );
		}
	},

	/**
	 * Add pictures to the list
	 */
	generatePictures: function()
	{
		//Add picture on each columns
		var myColumns = document.getElementsByClassName("content-column");
		var that = this;

		if( this.photos.length === 0 ) {
			document.getElementById("menu").classList.add("open")
		}

		var myFuncAddPhoto = function( index ) {
			if( index >= that.photos.length ) {
				return;
			}
            var myBestColumn = 0;
            var myLowerColumnHeight = Infinity;
            for( var i = 0; i < myColumns.length; i++ ) {
                var myArray = Array.from(myColumns[i].childNodes);
                var myHeight = (myArray.length === 0) ? 0 : Array.from(myColumns[i].childNodes).map(function( item ) {
                	return item.offsetHeight;
				}).reduce( function (item, currentValue) {
                    return currentValue + item;
                });
                if( myLowerColumnHeight > myHeight ) {
                    myBestColumn = i;
                    myLowerColumnHeight = myHeight;
                }
            }
            var myNode = document.createElement("img");
            myNode.classList.add("thumbnail");
            myNode.onload = function () {
                myFuncAddPhoto( index + 1 );
            };
            myNode.setAttribute("data-id", index + "");
            myNode.setAttribute("src", that.findThumbail(that.photos[index]) );
            myNode.addEventListener("click", function() {
                document.getElementById("modal-cover").classList.add("modal-visible");
                that.loadImageInModal(this.getAttribute("data-id"));
            });

            myColumns[myBestColumn].appendChild( myNode );
		};
		myFuncAddPhoto(0);
	},

	/**
	 * Generate default modal with empty values
	 */
	generateModal: function()
	{
		var that = this;
		var closeModal = function() { document.getElementById("modal-cover").classList.remove("modal-visible"); };

		document.getElementById("modal-close").addEventListener("click", function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
			closeModal();
            return false;
		});

		document.getElementById("modal-previous").addEventListener("click", function (ev) {
            //Load previous picture
            ev.stopPropagation();
            ev.preventDefault();
            that.loadImageInModal(this.getAttribute("data-load"));
            return false;
		});

        document.getElementById("modal-next").addEventListener("click", function (ev) {
            //Load previous picture
            ev.stopPropagation();
            ev.preventDefault();
            that.loadImageInModal(this.getAttribute("data-load"));
            return false;
        });

        document.getElementById("modal").addEventListener("click", function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
            return false;
		});

        document.getElementById("modal-cover").addEventListener("click", function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
            closeModal();
            return false;
        });
	},

	/**
	 * YOu should call this to generate all content in page
	 */
	generateAll: function()
	{
		this.generatePage();
		this.generateDirectories();
		this.generatePictures();
		this.generateModal();
	}
};
