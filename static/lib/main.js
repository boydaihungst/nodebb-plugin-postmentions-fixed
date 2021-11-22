'use strict';

$(document).ready(function () {
  let {
    categoryMatch,
    topicMatch,
    inCategories,
    searchChildren,
    timeFilter,
    timeRange,
    sortBy,
    sortDirection,
    numOfWordBeforeStop,
  } = {
    // Default config
    categoryMatch: '&c',
    topicMatch: '&t',
    sortBy: 'topic.title',
    sortDirection: 'asc',
    numOfWordBeforeStop: 2,
    ...config['postmentions'],
  };
console.log(numOfWordBeforeStop);
  searchChildren = searchChildren == 'on' ? true : false;
  inCategories = inCategories ? JSON.parse(inCategories) : 'all';
  const topicMatchRegex = new RegExp(
    `${topicMatch}(\\w+([^\\S\\r\\n]+|$)){1,${numOfWordBeforeStop}}$`,
  );
  const categoryMatchRegex = new RegExp(
    `${categoryMatch}(\\w+([^\\S\\r\\n]+|$)){1,${numOfWordBeforeStop}}$`,
  );

  /** {@link https://yuku.takahashi.coffee/textcomplete/} */
  $(window).on('composer:autocomplete:init', function (ev, data) {
    var topicSearch = {
      id: 'topicSearch',
      match: topicMatchRegex, // return ['A B', 'B',''] if match.
      cache: true,
      index: 0, // Don't change this. To catch space character
      search: function (termWithTopicMatch, callback) { // termWithTopicMatch = ['A A', 'A',''][index]
        const term = termWithTopicMatch.substr(topicMatch.length);
        if (
          !term ||
          (String(term).length) < 2
        ) {
          return callback([]);
        }
        //var topicList;
        $.getJSON(
          '/api/search/?term=' +
            term +
            '&in=titles' +
            `&categories[]=${inCategories}` +
            `&sortBy=${sortBy}` +
            `&sortDirection=${sortDirection}` +
            `&searchChildren=${searchChildren}` +
            `&timeRange=${timeRange}` +
            `&timeFilter=${timeFilter}` +
            '&showAs=posts',
          function (response) {
            callback(response.posts);
          },
        );
      },
      template: (elementOfSearchData) => {
        const parentCateogry = elementOfSearchData.category;
        const topic = elementOfSearchData.topic;
        return `
          <span class="postmentions" component="category-markup">
            <span class="postmentions__item fa-stack" style="background-color:${parentCateogry.bgColor};background-image:url('${parentCateogry.backgroundImage}');background-size: ${parentCateogry.imageClass}; color:${parentCateogry.color};">
              <i style="color: #ffffff;" class="fa fa-stack-1x fa-fw ${parentCateogry.icon}" style="color: ${parentCateogry.color}"></i>
            </span>
            / <span class="postmentions_label">${topic.title}</span>
          </span>
        `;
      },
      // Tu cursor -> indicator replace bang $
      replace: function (selectedData) {
        return `[${selectedData.topic.title}](/topic/${selectedData.topic.slug})`;
      },
    };

    /**
     * Category
     */
    var categorySearch = {
      id: 'categoriesSearch',
      match: categoryMatchRegex,
      index: 0,
      cache: true,
      search: function (termWithCategoryMatch, callback) {
        const term = termWithCategoryMatch.substr(categoryMatch.length);
        // Input at least 2 letters. If you wanna change, it's must >= 2
        if (
          !term ||
          String(term).length < 2
        ) {
          return callback([]);
        }
        socket.emit(
          'categories.categorySearch',
          {
            search: term || '',
            query: {},
            parentCid: 0,
            selectedCids: [],
            privilege: 'topics:read',
            states: ['watching', 'notwatching', 'ignoring'],
            showLinks: true,
          },
          function (err, categories) {
            if (err) {
              return app.alertError(err);
            }
            callback(categories);
          },
        );
      },
      template: (selectedItem) => {
        return `
        ${selectedItem.level}
          <span class="postmentions" component="category-markup">
            <span class="postmentions__item fa-stack" style="background-color:${selectedItem.bgColor};background-image:url('${selectedItem.backgroundImage}');background-size: ${selectedItem.imageClass}; color:${selectedItem.color};">
              <i style="color: #ffffff;" class="fa fa-stack-1x fa-fw ${selectedItem.icon}" style="color: ${selectedItem.color}"></i>
            </span>
            <span class="postmentions_label">${selectedItem.name}</span>
          </span>
        `;
      },
      replace: function (selectedData) {
        return `[${selectedData.name}](/category/${selectedData.cid})`;
      },
    };
    data.strategies.push(topicSearch);
    data.strategies.push(categorySearch);
  });

  $(window).on('action:composer.loaded', function (e, data) {
    var composer = $('#cmp-uuid-' + data.post_uuid + ' .write');
    composer.attr('data-mentions', '1');
  });
});
