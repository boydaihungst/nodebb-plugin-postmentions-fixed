<form role='form' class='postmentions-settings'>
  <div class='row'>
    <div
      class='col-sm-2 col-xs-12 settings-header'
    >[[postmentions:admin.section.general]]</div>
    <div class='col-sm-10 col-xs-12'>
      <div class='form-group'>
        <label for='categoryMatch'>[[postmentions:admin.category-match.label]]:
        </label>
        <input
          type='text'
          id='categoryMatch'
          name='categoryMatch'
          title='Category Match'
          class='form-control'
          value='&c'
        />
      </div>
      <div class='form-group'>
        <label for='topicMatch'>[[postmentions:admin.topic-match.label]]:
        </label>
        <input
          type='text'
          id='topicMatch'
          name='topicMatch'
          title='Topic Match'
          class='form-control'
          value='&t'
        />
      </div>
      <div class='form-group'>
        <label
          for='numOfSpaceInARoundBeforeStop'
        >[[postmentions:admin.section.max-space-before-stop-suggest.label]]:
        </label>
        <input
          type='number'
          id='numOfSpaceInARoundBeforeStop'
          name='numOfSpaceInARoundBeforeStop'
          title='Category Match'
          class='form-control'
          value='2'
        />
      </div>
    </div>
  </div>
  <div class='row'>
    <div
      class='col-sm-2 col-xs-12 settings-header'
    >[[postmentions:admin.section.topic-filter]]</div>
    <div class='col-sm-10 col-xs-12'>
      <div class='panel panel-default'>
        <div class='panel-heading'>
          <h3 class='panel-title'>
            <i class='fa fa-sort'></i>
          </h3>
        </div>
        <div class='panel-body search-options'>
          <div class='form-group post-search-item'>
            <div class='row'>
              <div class='col-md-6'>
                <label>[[search:in-categories]]</label>
                <select
                  multiple
                  class='form-control'
                  id='posted-in-categories'
                  name='inCategories'
                  size='{allCategoriesCount}'
                >
                  <option value='all' selected>
                    [[unread:all_categories]]
                  </option>
                  {{{each allCategories}}}
                  <option value='{allCategories.value}'>
                    {allCategories.text}
                  </option>
                  {{{end}}}
                </select>
                <input
                  type='checkbox'
                  id='search-children'
                  name='searchChildren'
                />
                [[search:search-child-categories]]
              </div>
              <div class='col-md-6'>
                <div class='form-group post-search-item'>
                  <label>[[search:post-time]]</label>
                  <div class='row'>
                    <div class='col-md-6'>
                      <select
                        id='post-time-filter'
                        class='form-control'
                        name='timeFilter'
                      >
                        <option value='newer'>[[search:newer-than]]</option>
                        <option value='older'>[[search:older-than]]</option>
                      </select>
                    </div>
                    <div class='col-md-6'>
                      <select
                        id='post-time-range'
                        class='form-control'
                        name='timeRange'
                      >
                        <option value=''>[[search:any-date]]</option>
                        <option value='86400'>[[search:yesterday]]</option>
                        <option value='604800'>[[search:one-week]]</option>
                        <option value='1209600'>[[search:two-weeks]]</option>
                        <option value='2592000'>[[search:one-month]]</option>
                        <option value='7776000'>[[search:three-months]]</option>
                        <option value='15552000'>[[search:six-months]]</option>
                        <option value='31104000'>[[search:one-year]]</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class='form-group post-search-item'>
                  <label>[[search:sort-by]]</label>
                  <div class='row'>
                    <div class='col-md-6'>
                      <select
                        id='post-sort-by'
                        class='form-control'
                        name='sortBy'
                      >
                        <option value='relevance'>[[search:relevance]]</option>
                        <option value='timestamp'>[[search:post-time]]</option>
                        <option value='votes'>[[search:votes]]</option>
                        <option value='topic.lastposttime'>
                          [[search:last-reply-time]]
                        </option>
                        <option value='topic.title' selected>
                          [[search:topic-title]]
                        </option>
                        <option value='topic.postcount'>
                          [[search:number-of-replies]]
                        </option>
                        <option value='topic.viewcount'>
                          [[search:number-of-views]]
                        </option>
                        <option value='topic.votes'>
                          [[search:topic-votes]]
                        </option>
                        <option value='topic.timestamp'>
                          [[search:topic-start-date]]
                        </option>
                        <option value='user.username'>
                          [[search:username]]
                        </option>
                        <option value='category.name'>
                          [[search:category]]
                        </option>
                      </select>
                    </div>
                    <div class='col-md-6'>
                      <select
                        id='post-sort-direction'
                        class='form-control'
                        name='sortDirection'
                      >
                        <option value='desc'>[[search:descending]]</option>
                        <option
                          value='asc'
                          selected
                        >[[search:ascending]]</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</form>

<button
  id='clear'
  class='floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'
>
  <i class='material-icons'>[[search:clear-preferences]]</i>
</button>
<button
  id='save'
  class='floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'
>
  <i class='material-icons'>save</i>
</button>
