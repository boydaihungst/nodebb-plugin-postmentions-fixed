"use strict";
/* globals socket, app, utils */


$(document).ready(function() {
	// start variable to grab the last JSON data
	var lastData;
	var topicList;
	var catList = [];
	var catData = [];
	$(window).on('composer:autocomplete:init', function(ev, data) {
		loadCatNames();
		var topicSearch = {
			match: /\&t([^\s\n]*)?$/,
			search: function (term, callback) {
				//var topicList;
				$.getJSON("/api/search/?term=" + term + "&in=titles&sortBy=topic.title&sortDirection=&showAs=posts", function (data) {
					if (data) {
						topicList = data.posts.map(function(post) {
				     		return post.topic.title;
				     	});
				     	// save lastData to be used in replacing function
				     	lastData = data.posts;
				     	callback(topicList);
					}
				});
			},
			index: 1,
			replace: function (mention, ev) {
				if (lastData.length && lastData[0].topic) {
					return '[' + mention + '](/topic/' + lastData[0].topic.slug + ') '
				}
				else {
					return;
				}
			},
			cache: true
		};
		var categorySearch = {
			match: /\&c([^\s\n]*)?$/,
			search: function (term, callback) {
				if (!term) {
					var categories = catList.filter(function(value, index, array) {
						return array.indexOf(value) === index;
					});
					callback(categories);
				} else {
					callback($.map(catList, function (word) {
		                return word.indexOf(term) === 0 ? word : null;
		            }));
				}
			},
			index: 1,
			replace: function (mention, ev) {
				function search(nameKey, myArray){
				    for (var i=0; i < myArray.length; i++) {
				        if (myArray[i].name === nameKey) {
				            return myArray[i];
				        }
				    }
				}
				var resultObject = search(mention, catData);
				return '[' + resultObject.name + '](/category/' + resultObject.cid + ') '
			},
			cache: true
		};
		data.strategies.push(topicSearch);
		data.strategies.push(categorySearch);
	});

	$(window).on('action:composer.loaded', function(e, data) {
		var composer = $('#cmp-uuid-' + data.post_uuid + ' .write');
		composer.attr('data-mentions', '1');
	});

	function loadCatNames() {
		$.getJSON("/api/categories", function (data) {
			if (data) {
				var childrenCids = [];
				var allCategories = [];
				var category;
				function eachRecursive(obj)
				{
				    for (var k in obj)
				    {
				        if (typeof obj[k] == "object" && obj[k] !== null) {
			        		catList.push(obj[k].name);
			        		category = {
			        			name: obj[k].name,
			        			cid: obj[k].cid
			        		}
			        		catData.push(category)
			        	    eachRecursive(obj[k].children);
				        }
				        else
				        {
				        	return;
				        }
				    }
				}
				eachRecursive(data.categories);
			}
		});
	}
});