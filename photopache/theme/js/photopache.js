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
		$("td.indexcolname > a").each(function(index)
		{
			if(index == 0)
			{
				return;
			}

			if( ! $(this).text().match("\.[a-zA-Z]+$"))
			{
				that.directories.push($(this).text());
			}
			else if( ! $(this).text().match("-thumbnail\.[a-zA-Z]+$"))
			{
				that.photos.push($(this).text());
			}
		});

		$("#indexlist").remove();
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
		$(".modal-title > h1").text(this.clearName(this.photos[parseInt(id)]));
		$(".modal").attr("data-id", $(this).attr("data-id")).css("background-image", "url(" + encodeURI(this.photos[parseInt(id)]) + ")");

		var myNewId = parseInt(id);
		if(id == 0)
		{
			$(".modal-next").attr("data-load", myNewId + 1);
			$(".modal-previous").attr("data-load", this.photos.length - 1);
		}
		else if(id == this.photos.length - 1)
		{
			$(".modal-next").attr("data-load", 0);
			$(".modal-previous").attr("data-load", myNewId - 1);
		}
		else
		{
			$(".modal-next").attr("data-load", myNewId + 1);
			$(".modal-previous").attr("data-load", myNewId - 1);
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
		$("<div></div>").addClass("pure-g").appendTo("body");

		this.totalColumns = 24;
		var myScreenWidth = $(window).width();
		if(myScreenWidth <= 1920)
		{
			this.totalColumns = 12;
			if(myScreenWidth <= 1600)
			{
				this.totalColumns = 8;
				if(myScreenWidth <= 1336)
				{
					this.totalColumns = 6;
					if(myScreenWidth <= 1024)
					{
						this.totalColumns = 4;
						if(myScreenWidth <= 640)
						{
							this.totalColumns = 3;
							if(myScreenWidth <= 480)
							{
								this.totalColumns = 2;
								if(myScreenWidth <= 320)
								{
									this.totalColumns = 1;
								}
							}
						}
					}
				}
			}
		}

		for(var cpt = 0; cpt < this.totalColumns; cpt++)
		{
			$("<div></div>").addClass("pure-u-1-" + this.totalColumns).appendTo($(".pure-g"));
		}
	},

	/**
	 * Generate content from left menu
	 */
	generateDirectories: function()
	{
		for(var cpt = 0; cpt < this.directories.length; cpt++)
		{
			$(".pure-menu-list").append('<li class="pure-menu-item"><a href="' + this.directories[cpt] + '" class="pure-menu-link">' + this.directories[cpt] + '</a></li>');
		}
	},

	/**
	 * Add pictures to the list
	 */
	generatePictures: function()
	{
		//Add picture on each columns
		for(var i = 0; i < this.photos.length; i++)
		{
			$(".pure-g > div").eq(i % this.totalColumns).append($("<div></div>").addClass("thumbnail").css("background-image", "url(" + this.findThumbail(this.photos[i]) + ")").attr("data-id", i));
		}

		//Do something on click
		var that = this;
		$(".thumbnail").click(function()
		{
			$(".modal-cover").addClass("modal-visible");
			that.loadImageInModal($(this).attr("data-id"));
		});
	},

	/**
	 * Generate default modal with empty values
	 */
	generateModal: function()
	{
		var that = this;
		var closeModal = function() { $(".modal-cover").removeClass("modal-visible"); };
		$("body").append(
			$("<div></div>").addClass("modal-cover").append(
				$("<div></div>").addClass("modal").append(
					$("<div></div>").addClass("modal-title").append(
						$("<span></span>").addClass("modal-close").text("X").click(
							function(event)
							{
								//Close modal
								event.stopPropagation();
								closeModal();
							})
					).append(
						$("<h1></h1>")
					)
				).append(
					$("<div></div>").addClass("modal-arrow modal-previous").append(
						$("<h1></h1>").text("←")
					).click(function(event)
					{
						//Load previous picture
						event.stopPropagation();
						that.loadImageInModal($(this).attr("data-load"));
					})
				).append(
					$("<div></div>").addClass("modal-arrow modal-next").append(
						$("<h1></h1>").text("→")
					).click(function(event)
					{
						//Load next picture
						event.stopPropagation();
						that.loadImageInModal($(this).attr("data-load"));
					})
				).click(function(event)
				{
					//Do nothing
					event.stopPropagation();
				})
			).click(function(event)
			{
				//Close modal
				event.stopPropagation();
				closeModal();
			})
		);
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
