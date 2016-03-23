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

	generateDirectories: function()
	{
		for(var cpt = 0; cpt < this.directories.length; cpt++)
		{
			$(".pure-menu-list").append('<li class="pure-menu-item"><a href="' + this.directories[cpt] + '" class="pure-menu-link">' + this.directories[cpt] + '</a></li>');
		}
	},

	generatePictures: function()
	{
		for(var cpt = 0; cpt < this.photos.length; cpt++)
		{
			$(".pure-g > div").eq(cpt % this.totalColumns).append($("<div></div>").addClass("thumbnail").css("background-image", "url(" + this.findThumbail(this.photos[cpt]) + ")").attr("data-name", this.clearName(this.photos[cpt])).attr("data-url", this.photos[cpt]));
		}

		$(".thumbnail").click(function()
		{
			$(".modal-cover").addClass("modal-visible");
		});
	},

	generateModal: function()
	{
		$("body").append(
			$("<div></div>").addClass("modal-cover").append(
				$("<div></div>").addClass("modal").append(
					$("<div></div>").addClass("modal-title").append(
						$("<span></span>").addClass("modal-close").text("X").click(
							function()
							{
								$(".modal-cover").removeClass("modal-visible");
							})
					).append(
						$("<h1></h1>")
					)
				).append(
					$("<img />")
				)
			)
		);
	},

	generateAll: function()
	{
		this.generatePage();
		this.generateDirectories();
		this.generatePictures();
		this.generateModal();
	},

	/**
	 * Replace in name "-(lowerCase)" by " (lowerCase)" and "_(lowerCase)" by " (UpperCase)"
	 * @param name The name you want to parse
	 * @returns {string} Name formatted
	 */
	clearName: function(name)
	{
		return name.replace(/-([a-z])/, function(v) { return " " + v; }).replace(/-([a-z])/, function(v) { return " " + v.toUpperCase(); }).replace(/\/([^\/]*\/)+(.+)(\.\w+)+/, "$2");
	},

	findThumbail: function(link)
	{
		return link.replace(/(\.[a-zA-Z]+)$/, function(v) { console.log("-thumbnail" + v);return "-thumbnail" + v; });
	}
};
