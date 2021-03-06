/**
 * angular-strap
 * @version v2.3.9 - 2016-06-10
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.scrollspy', [ 'mgcrea.ngStrap.helpers.debounce', 'mgcrea.ngStrap.helpers.dimensions' ]).provider('$scrollspy', function() {
  var spies = this.$$spies = {};
  var defaults = this.defaults = {
    debounce: 150,
    throttle: 100,
    offset: 100
  };
  this.$get = [ '$window', '$document', '$rootScope', 'dimensions', 'debounce', 'throttle', function($window, $document, $rootScope, dimensions, debounce, throttle) {
    var windowEl = angular.element($window);
    var docEl = angular.element($document.prop('documentElement'));
    var bodyEl = angular.element($window.document.body);
    function nodeName(element, name) {
      return element[0].nodeName && element[0].nodeName.toLowerCase() === name.toLowerCase();
    }
    function ScrollSpyFactory(config) {
      var options = angular.extend({}, defaults, config);
      if (!options.element) options.element = bodyEl;
      var isWindowSpy = nodeName(options.element, 'body');
      var scrollEl = isWindowSpy ? windowEl : options.element;
      var scrollId = isWindowSpy ? 'window' : options.id;
      if (spies[scrollId]) {
        spies[scrollId].$$count++;
        return spies[scrollId];
      }
      var $scrollspy = {};
      var unbindViewContentLoaded;
      var unbindIncludeContentLoaded;
      var trackedElements = $scrollspy.$trackedElements = [];
      var sortedElements = [];
      var activeTarget;
      var debouncedCheckPosition;
      var throttledCheckPosition;
      var debouncedCheckOffsets;
      var viewportHeight;
      var scrollTop;
      $scrollspy.init = function() {
        this.$$count = 1;
        debouncedCheckPosition = debounce(this.checkPosition, options.debounce);
        throttledCheckPosition = throttle(this.checkPosition, options.throttle);
        scrollEl.on('click', this.checkPositionWithEventLoop);
        windowEl.on('resize', debouncedCheckPosition);
        scrollEl.on('scroll', throttledCheckPosition);
        debouncedCheckOffsets = debounce(this.checkOffsets, options.debounce);
        unbindViewContentLoaded = $rootScope.$on('$viewContentLoaded', debouncedCheckOffsets);
        unbindIncludeContentLoaded = $rootScope.$on('$includeContentLoaded', debouncedCheckOffsets);
        debouncedCheckOffsets();
        if (scrollId) {
          spies[scrollId] = $scrollspy;
        }
      };
      $scrollspy.destroy = function() {
        this.$$count--;
        if (this.$$count > 0) {
          return;
        }
        scrollEl.off('click', this.checkPositionWithEventLoop);
        windowEl.off('resize', debouncedCheckPosition);
        scrollEl.off('scroll', throttledCheckPosition);
        unbindViewContentLoaded();
        unbindIncludeContentLoaded();
        if (scrollId) {
          delete spies[scrollId];
        }
      };
      $scrollspy.checkPosition = function() {
        if (!sortedElements.length) return;
        scrollTop = (isWindowSpy ? $window.pageYOffset : scrollEl.prop('scrollTop')) || 0;
        viewportHeight = Math.max($window.innerHeight, docEl.prop('clientHeight'));
        if (scrollTop < sortedElements[0].offsetTop && activeTarget !== sortedElements[0].target) {
          return $scrollspy.$activateElement(sortedElements[0]);
        }
        for (var i = sortedElements.length; i--; ) {
          if (angular.isUndefined(sortedElements[i].offsetTop) || sortedElements[i].offsetTop === null) continue;
          if (activeTarget === sortedElements[i].target) continue;
          if (scrollTop < sortedElements[i].offsetTop) continue;
          if (sortedElements[i + 1] && scrollTop > sortedElements[i + 1].offsetTop) continue;
          return $scrollspy.$activateElement(sortedElements[i]);
        }
      };
      $scrollspy.checkPositionWithEventLoop = function() {
        setTimeout($scrollspy.checkPosition, 1);
      };
      $scrollspy.$activateElement = function(element) {
        if (activeTarget) {
          var activeElement = $scrollspy.$getTrackedElement(activeTarget);
          if (activeElement) {
            activeElement.source.removeClass('active');
            if (nodeName(activeElement.source, 'li') && nodeName(activeElement.source.parent().parent(), 'li')) {
              activeElement.source.parent().parent().removeClass('active');
            }
          }
        }
        activeTarget = element.target;
        element.source.addClass('active');
        if (nodeName(element.source, 'li') && nodeName(element.source.parent().parent(), 'li')) {
          element.source.parent().parent().addClass('active');
        }
      };
      $scrollspy.$getTrackedElement = function(target) {
        return trackedElements.filter(function(obj) {
          return obj.target === target;
        })[0];
      };
      $scrollspy.checkOffsets = function() {
        angular.forEach(trackedElements, function(trackedElement) {
          var targetElement = document.querySelector(trackedElement.target);
          trackedElement.offsetTop = targetElement ? dimensions.offset(targetElement).top : null;
          if (options.offset && trackedElement.offsetTop !== null) trackedElement.offsetTop -= options.offset * 1;
        });
        sortedElements = trackedElements.filter(function(el) {
          return el.offsetTop !== null;
        }).sort(function(a, b) {
          return a.offsetTop - b.offsetTop;
        });
        debouncedCheckPosition();
      };
      $scrollspy.trackElement = function(target, source) {
        trackedElements.push({
          target: target,
          source: source
        });
      };
      $scrollspy.untrackElement = function(target, source) {
        var toDelete;
        for (var i = trackedElements.length; i--; ) {
          if (trackedElements[i].target === target && trackedElements[i].source === source) {
            toDelete = i;
            break;
          }
        }
        trackedElements.splice(toDelete, 1);
      };
      $scrollspy.activate = function(i) {
        trackedElements[i].addClass('active');
      };
      $scrollspy.init();
      return $scrollspy;
    }
    return ScrollSpyFactory;
  } ];
}).directive('bsScrollspy', [ '$rootScope', 'debounce', 'dimensions', '$scrollspy', function($rootScope, debounce, dimensions, $scrollspy) {
  return {
    restrict: 'EAC',
    link: function postLink(scope, element, attr) {
      var options = {
        scope: scope
      };
      angular.forEach([ 'offset', 'target' ], function(key) {
        if (angular.isDefined(attr[key])) options[key] = attr[key];
      });
      var scrollspy = $scrollspy(options);
      scrollspy.trackElement(options.target, element);
      scope.$on('$destroy', function() {
        if (scrollspy) {
          scrollspy.untrackElement(options.target, element);
          scrollspy.destroy();
        }
        options = null;
        scrollspy = null;
      });
    }
  };
} ]).directive('bsScrollspyList', [ '$rootScope', 'debounce', 'dimensions', '$scrollspy', function($rootScope, debounce, dimensions, $scrollspy) {
  return {
    restrict: 'A',
    compile: function postLink(element, attr) {
      var children = element[0].querySelectorAll('li > a[href]');
      angular.forEach(children, function(child) {
        var childEl = angular.element(child);
        childEl.parent().attr('bs-scrollspy', '').attr('data-target', childEl.attr('href'));
      });
    }
  };
} ]);
/**
 * angular-strap
 * @version v2.3.9 - 2016-06-10
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.helpers.debounce', []).factory('debounce', [ '$timeout', function($timeout) {
  return function(func, wait, immediate) {
    var timeout = null;
    return function() {
      var context = this;
      var args = arguments;
      var callNow = immediate && !timeout;
      if (timeout) {
        $timeout.cancel(timeout);
      }
      timeout = $timeout(function later() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      }, wait, false);
      if (callNow) {
        func.apply(context, args);
      }
      return timeout;
    };
  };
} ]).factory('throttle', [ '$timeout', function($timeout) {
  return function(func, wait, options) {
    var timeout = null;
    if (!options) options = {};
    return function() {
      var context = this;
      var args = arguments;
      if (!timeout) {
        if (options.leading !== false) {
          func.apply(context, args);
        }
        timeout = $timeout(function later() {
          timeout = null;
          if (options.trailing !== false) {
            func.apply(context, args);
          }
        }, wait, false);
      }
    };
  };
} ]);
/**
 * angular-strap
 * @version v2.3.9 - 2016-06-10
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.helpers.dimensions', []).factory('dimensions', function() {
  var fn = {};
  var nodeName = fn.nodeName = function(element, name) {
    return element.nodeName && element.nodeName.toLowerCase() === name.toLowerCase();
  };
  fn.css = function(element, prop, extra) {
    var value;
    if (element.currentStyle) {
      value = element.currentStyle[prop];
    } else if (window.getComputedStyle) {
      value = window.getComputedStyle(element)[prop];
    } else {
      value = element.style[prop];
    }
    return extra === true ? parseFloat(value) || 0 : value;
  };
  fn.offset = function(element) {
    var boxRect = element.getBoundingClientRect();
    var docElement = element.ownerDocument;
    return {
      width: boxRect.width || element.offsetWidth,
      height: boxRect.height || element.offsetHeight,
      top: boxRect.top + (window.pageYOffset || docElement.documentElement.scrollTop) - (docElement.documentElement.clientTop || 0),
      left: boxRect.left + (window.pageXOffset || docElement.documentElement.scrollLeft) - (docElement.documentElement.clientLeft || 0)
    };
  };
  fn.setOffset = function(element, options, i) {
    var curPosition;
    var curLeft;
    var curCSSTop;
    var curTop;
    var curOffset;
    var curCSSLeft;
    var calculatePosition;
    var position = fn.css(element, 'position');
    var curElem = angular.element(element);
    var props = {};
    if (position === 'static') {
      element.style.position = 'relative';
    }
    curOffset = fn.offset(element);
    curCSSTop = fn.css(element, 'top');
    curCSSLeft = fn.css(element, 'left');
    calculatePosition = (position === 'absolute' || position === 'fixed') && (curCSSTop + curCSSLeft).indexOf('auto') > -1;
    if (calculatePosition) {
      curPosition = fn.position(element);
      curTop = curPosition.top;
      curLeft = curPosition.left;
    } else {
      curTop = parseFloat(curCSSTop) || 0;
      curLeft = parseFloat(curCSSLeft) || 0;
    }
    if (angular.isFunction(options)) {
      options = options.call(element, i, curOffset);
    }
    if (options.top !== null) {
      props.top = options.top - curOffset.top + curTop;
    }
    if (options.left !== null) {
      props.left = options.left - curOffset.left + curLeft;
    }
    if ('using' in options) {
      options.using.call(curElem, props);
    } else {
      curElem.css({
        top: props.top + 'px',
        left: props.left + 'px'
      });
    }
  };
  fn.position = function(element) {
    var offsetParentRect = {
      top: 0,
      left: 0
    };
    var offsetParentEl;
    var offset;
    if (fn.css(element, 'position') === 'fixed') {
      offset = element.getBoundingClientRect();
    } else {
      offsetParentEl = offsetParentElement(element);
      offset = fn.offset(element);
      if (!nodeName(offsetParentEl, 'html')) {
        offsetParentRect = fn.offset(offsetParentEl);
      }
      offsetParentRect.top += fn.css(offsetParentEl, 'borderTopWidth', true);
      offsetParentRect.left += fn.css(offsetParentEl, 'borderLeftWidth', true);
    }
    return {
      width: element.offsetWidth,
      height: element.offsetHeight,
      top: offset.top - offsetParentRect.top - fn.css(element, 'marginTop', true),
      left: offset.left - offsetParentRect.left - fn.css(element, 'marginLeft', true)
    };
  };
  function offsetParentElement(element) {
    var docElement = element.ownerDocument;
    var offsetParent = element.offsetParent || docElement;
    if (nodeName(offsetParent, '#document')) return docElement.documentElement;
    while (offsetParent && !nodeName(offsetParent, 'html') && fn.css(offsetParent, 'position') === 'static') {
      offsetParent = offsetParent.offsetParent;
    }
    return offsetParent || docElement.documentElement;
  }
  fn.height = function(element, outer) {
    var value = element.offsetHeight;
    if (outer) {
      value += fn.css(element, 'marginTop', true) + fn.css(element, 'marginBottom', true);
    } else {
      value -= fn.css(element, 'paddingTop', true) + fn.css(element, 'paddingBottom', true) + fn.css(element, 'borderTopWidth', true) + fn.css(element, 'borderBottomWidth', true);
    }
    return value;
  };
  fn.width = function(element, outer) {
    var value = element.offsetWidth;
    if (outer) {
      value += fn.css(element, 'marginLeft', true) + fn.css(element, 'marginRight', true);
    } else {
      value -= fn.css(element, 'paddingLeft', true) + fn.css(element, 'paddingRight', true) + fn.css(element, 'borderLeftWidth', true) + fn.css(element, 'borderRightWidth', true);
    }
    return value;
  };
  return fn;
});
( function() {
    'use strict';

    function FlcCtrl() {
        var vm = this;
    }

    angular.module( 'fairfield-league-constitution', [ 'fairfield-league-constitution.templates', 'mgcrea.ngStrap.scrollspy', 'mgcrea.ngStrap.helpers.debounce', 'mgcrea.ngStrap.helpers.dimensions' ] )

    .provider( 'fairfieldLeagueConstitution', function() {
        var vm = this;

        vm.state = 'fairfieldLeagueConstitution';
        vm.setState = function( state ) {
            vm.state = state;
        }

        vm.url = '#/fairfield-league-consitution';
        vm.setUrl = function( url ) {
            vm.url = url;
        }

        vm.display = 'fairfield league constitution';
        vm.setDisplay = function( display ) {
            vm.display = display;
        }

        vm.page = {
            state : vm.state,
            url : vm.url,
            template : '<constitution-document></constitution-document>',
            display : vm.display
        }

        vm.$get = function() {
            return vm;
        };
    } );
}() );

( function() {
    'use strict';

    angular.module( 'fairfield-league-constitution' )

    .component( 'constitutionDocument', {
        templateUrl : 'components/constitution-document/constitution-document.html',
        controller : [ ConstitutionDocumentCtrl ]
    } );

    function ConstitutionDocumentCtrl() {
        var vm = this;
    }
} )();

( function() {
    'use strict';

    angular.module( 'fairfield-league-constitution' )

    .directive( 'affixMe', [ '$timeout', '$window', function( $timeout, $window ) {
        return {
            restrict : 'A',
            link : function( $scope, elem, attrs ) {
                $( '#sidebar' ).affix( {
                    offset : {
                        top : $( 'header' ).height()
                    }
                } );
            }
        }
    } ] );
} )();

(function(){angular.module('fairfield-league-constitution.templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('components/constitution-document/constitution-document.html','<header class="masthead">\n    <div class="container">\n        <div class="row">\n            <div class="col-md-5">\n                <img\n                    ng-src="http://placecorgi.com/450/300"\n                    alt="placeholder"\n                    width="450"\n                    height="300">\n            </div>\n            <div class="col-md-7">\n                <h1>\n                    fairfield football club\n                    <p class="lead">a league constitution</p>\n                </h1>\n                <em>created on thursday, the twenty-fifth of july in god\'s year of two thousand and thirteen</em>\n            </div>\n        </div>\n    </div>\n</header>\n\n<div class="container">\n    <div\n        class="row"\n        affix-me>\n        <div class="col-md-3 sidebar">\n            <ul\n                bs-scrollspy-list\n                id="sidebar"\n                class="nav nav-stacked affix">\n                <li><a href="#preamble">preamble</a></li>\n                <li><a href="#founding-league-members">founding league members</a></li>\n                <li><a href="#governing-body">governing body</a>\n                    <ul class="nav">\n                        <li><a href="#governing-body-senior-board">the senior board</a></li>\n                        <li><a href="#governing-body-commish">the league commissioner</a></li>\n                    </ul></li>\n                <li><a href="#league-members">league members</a></li>\n                <li><a href="#league-setup">league setup</a></li>\n                <li><a href="#draft-process">draft process</a></li>\n                <li><a href="#roster-moves">roster moves</a></li>\n                <li><a href="#regular-season">regular season</a></li>\n                <li><a href="#playoffs">playoffs</a></li>\n                <li><a href="#payouts">payouts</a></li>\n                <li><a href="#disgraceful-punishment-for-sucking">disgraceful punishment for sucking</a></li>\n                <li><a href="#amendments">amendments</a></li>\n            </ul>\n        </div>\n\n        <div class="col-md-9">\n            <hr />\n            <h2 id="preamble">preamble</h2>\n            we the people of the fairfield football club fantasy football league, in order to form a more perfect union of sarcastically aggressive banter\n            amongst peers and grudgingly difficult transactions of personal finances, establish justification of smug condenscension at the peoples\' perceived\n            knowledge of the game of american football, insure domestic tranquility on the sundays, mondays, and occasional thursday and saturday that the\n            people of the league must keep sacred, provide for the common defence and offence with which the teams of the people prove their worth, promote the\n            general welfare of all players of the game of american football so they may remain free of heinous crime and veinous drug as they currently do so\n            exist, and secure the blessings of victory to thine self and thine own posterity, do ordain and establish this constitution for the fantasy football\n            league of the fairfield football club.\n\n\n            <hr />\n            <h2 id="founding-league-members">the founding league members</h2>\n            <p>the fairfield football club fantasy football league was founded by the following brave souls:</p>\n            <ul class="no-list-style">\n                <li>adam "white paul pierce" barlow</li>\n                <li>chris "red shorts" banten</li>\n                <li>eric "president big bush" d\'elia</li>\n                <li>rob "robby i-balls" intrieri</li>\n                <li>charlie "lord of the tale" kollar</li>\n                <li>brendan "glory boy" lane</li>\n                <li>nick "the dick-tator" makes</li>\n                <li>brian "black irish" mcardle</li>\n                <li>rob "the wedding planner" pigue</li>\n                <li>dan "statman (\'ski bi di bi di do bap do\')" pogoda</li>\n                <li>mark "daddy\'s boy" rodgers</li>\n                <li>alex "deep v\'s & tight jeans" voucas</li>\n                <li>mike "the yurkinator" yurkerwich</li>\n            </ul>\n            <p>and also founded by:\n            <ul class="no-list-style">\n                <li>rich "dicky v" velotta</li>\n            </ul>\n\n            <hr />\n            <h2 id="governing-body">governing body</h2>\n\n            <h3 id="governing-body-senior-board">the senior board (the sb)</h3>\n            <p>the senior board, herafter referred to as the sb, will be comprised of 4 active league managers.</p>\n            <p>active league managers are defined as persons managing (or co-managing) a fantasy football team for the upcoming and/or current nfl season.\n                their status as an active league manager is not determined nor affected by seasons prior or future.</p>\n            <p>\n                the sb will be responsible for selecting or re-administering the commish prior to each fantasy season\'s draft day, each year.<br />in the event\n                of a tied vote for a new commish, the vote will then be opened up to the rest of the league. in the event this vote still remains tied, the\n                league\'s most recent commish, who still remains an active league manager, will reside as the current year\'s commish.\n            </p>\n            <p>active league managers may choose to step down from residing on the sb during any off-season but not in the middle of the fantasy season, and\n                it will become the remaining sb\'s duty to select a new member at such a time.</p>\n            <p>the sb will handle all issues such as league complaints and suggestions towards enhancing the league\'s settings. input shall be accepted from\n                any active league manager by the sb, who will in turn decide whether or not this issue needs resolving.</p>\n\n            <h3 id="governing-body-commish">the league commissioner (the commish)</h3>\n            <p>the commish does not have autonomous rule over the league and may be removed from office through a vote by the sb (either unanimously or with\n                at most one vote of contention).</p>\n            <p>the commish will be responsible for running day-to-day operations of the league in the fairest manner possible; subsequently requiring the\n                commish to interpret the terms outlined in this charter in conjunction with the rules provided by yahoo! fantasy football in order to deem the\n                most appropriate course of action.</p>\n            <p>the commish is responsible for ensuring league continuity from season to season.</p>\n            <p>the commish is responsible for maintaining and updating this charter when deemed necessary by the sb.</p>\n            <p>the commish is responsible for handling all league finances related to collection and distribution.</p>\n\n            <hr />\n            <h2 id="league-members">league members</h2>\n\n            <p>as this is the inaugural season for this league\'s formalities, the commish has took it upon himslef to initially elect the members of the sb\n                based upon past exemplified enthusiasm for the sport:</p>\n            <ul class="no-list-style">\n                <li>adam "white paul pierce" barlow</li>\n                <li>chris "red shorts" banten</li>\n                <li>eric "president big bush" d\'elia</li>\n                <li>mark "daddy\'s boy" rodgers</li>\n            </ul>\n            <p>there will be 14 league managers per season, no more and no less.</p>\n            <p>should a different number of managers be required for any season, this addition/subtraction must occur in twos.</p>\n            <p>all returning managers retain the right for "first dibs" on procuring a team for the next season provided they have not been previously\n                banned.</p>\n\n            <h3>bannings</h3>\n            <p>bannings will be instituted by the sb based on a majority vote and must be upheld for a minimum of 1 season and a maximum of a lifetime\n                sentence.</p>\n            <p>bannings will be issued as a result of franchise negligence, failure to pay league fees in a timely manner and/or for reasons currently\n                beyond comprehension but for which, at said time, the sb demms banning appropriate through majority vote.</p>\n            <p>the sb, in conjunction with the commish, will be responsible for setting the weekly lineup for any and all banned franchises during\n                mid-season to ensure fair matchups for all managers throughout the season. a banned franchise will not allowed to pick up free agents via the\n                waiver wire and will have to wait until the waiver period has ended before picking up any necessary position players to field a full roster.</p>\n\n            <hr />\n            <h2 id="league-setup">league setup</h2>\n\n            <h3>league fees</h3>\n            <p>league fees will equal the entry fee for each manager. currently there are no league setup fees due to the use of a paid third party vendor.</p>\n            <p>\n                the entry fee, which constitutes each manager\'s contributions to the league\'s prize pool, is <a href="#">$125</a>.\n            </p>\n            <p>\n                league fees will be due by 11:59pm on the sunday prior to week 1\'s first scheduled game. this means they must reach the commish by this time\n                either in person or via PayPal.\n                <del>the commish has no interest in signing up for venmo at this time.</del>\n                yeah that was dumb, venmo\'s great.\n            </p>\n            <p>as noted before, failure to pay league fees will result in deliberation of the sb to determine if banning is required.</p>\n\n            <h3>rosters</h3>\n            <p>\n                each team roster will be comprised of <a href="#">15</a> players. at a minimum, a team must field an active qb, 2 rbs, 2 wrs, 1 te, 1 flex\n                player (defined as a rb, wr, or te), 1 k, and 1 d/st.\n            </p>\n            <p>should a manager neglect these rules, the sb will deliberate whether or not these actions were intentional with premeditated malice towards\n                blemishing the integrity of the league.</p>\n            <p>a banning may be a suitable punishment in this instance. you jerk.</p>\n\n            <h3>scoring</h3>\n            <p>\n                specific points per football play are defined on the league\'s home page under the <a href="#">"scoring and settings"</a> section. i\'m not typing\n                those out.\n            </p>\n            <p>negative points and decimal points will be implemented.</p>\n            <p>this is not a points per reception league nor do encourage the use of bonus points.</p>\n            <p>\n                the league will adhere to any and all stat corrections deemed appropriate by <a href="#">yahoo! fantasy football</a>, in addition to any of the\n                matchup result repercussions that may occur afterwards.\n            </p>\n\n            <p>the sb can also choose to implement stat corrections based on majority vote. the commish will in turn edit the matchup results where\n                appropriate based on the advice provided by the sb.</p>\n\n            <h3>divisions</h3>\n            <p>\n                there will be two 7-team divisions: <a href="https://www.youtube.com/watch?v=rqdxHwaxrNM">cuttlefish & asparagus vs. vanilla paste</a>.\n            </p>\n            <p>teams will be placed into divisions based on their draft order of the current season. all odd numbered draft picks in round 1 will be placed\n                in cuttlefish & asparagus and all even numbered draft picks in round 1 will be placed in vanilla paste.</p>\n            <p>the teams that win their respective divisions will subsequently be guaranteed one of the top two seeds for the post season.</p>\n            <p>\n                the win-loss records, in addition to <a href="#">yahoo! fantasy sport\'s</a> default tiebreaking rules, will determine this relative seeding.\n            </p>\n            <p>the divisions become irrelevant when deciding the four additional wild card spots in the post-seasons. simply the next four best teams will\n                be competing for the championship.</p>\n\n            <strong>halftime</strong>\n            <div class="row">\n                <div class="col-md-4">\n                    <img\n                        ng-src="http://placecorgi.com/720/480"\n                        class="img-responsive">\n                </div>\n                <div class="col-md-4">\n                    <img\n                        ng-src="http://placecorgi.com/720/480"\n                        class="img-responsive">\n                </div>\n                <div class="col-md-4">\n                    <img\n                        ng-src="http://placecorgi.com/720/480"\n                        class="img-responsive">\n                </div>\n            </div>\n\n            <hr />\n            <h2 id="draft-process">draft process</h2>\n\n            <p>it is expected that all active league managers make reasonable attempts at arranging and joining a draft day party. it is expected this party\n                have plenty of beers, either a grill for barbecue or a table for pizza, ample seating, ample electical outlets, and ample wifi.</p>\n            <p>the draft order will be determined in a random fashion. the commish and at least one active league manager must video tape this process and\n                publish it to the league so that no fraudulent behavios is possible.</p>\n            <p>\n                managers will have <a href="#">60</a> seconds to select a draft pick in each round.\n            </p>\n            <p>any active league manager who is able to draft purple jesus before he is able to fall to mark rodgers immediately becomes a favorite of the\n                commish for that football season. this applies for any future all-stars that may play for the minnesota vikings as well (doubtful).</p>\n            <p>the draft will be of a snake type where picks are made sequentially and not in auction format.</p>\n            <p>the draft date must occur after the first scheduled preseason game is played but before the first scheduled regular season game is played.</p>\n            <p>outside of those draft date boundaries, a best effort must be made by the commish to select a date that ensures a maximum number of managers\n                may attend the draft to avoid auto-picking.</p>\n\n            <hr />\n            <h2 id="roster-moves">roster moves</h2>\n\n            <h3>add/drop players</h3>\n            <p>any player dropped from a team will immediately be placed on waivers in accordance with the leagues settings.</p>\n            <p>\n                the league will utilize yahoo! fantasy football\'s proprietary <a href="#">"can\'t cut" list</a>.\n            </p>\n\n            <h3>waivers</h3>\n            <p>the waiver period will be from game time to tuesday.</p>\n            <p>game time means that all unowned players will be placed on waivers at the scheduled start time of their game. in game time waivers, players\n                on a bye week will be placed on waivers monday night at 8:30pm est.</p>\n            <p>tuesday means that the claim period ends at 2:59am est on wednesday morning, or thereabouts.</p>\n            <p>once the claim period ends, every team\'s waiver claims will be executed on a priority basis. if two teams have a waiver claim on the same\n                player, the team with a higher priority will receive said player.</p>\n            <p>waiver priority initially begins as the reverse of the draft order. once a team has a waiver claim processed successfully, they immediately\n                drop to the bottom of the waiver priority list.</p>\n\n            <h3>trades</h3>\n            <p>active league managers have 2 days to protest any pending league trades.</p>\n            <p>a minimum of 1/3 of the league needs to protest a trade for it to be vetoed. for a 14 team league, this means a minimum of 5 votes.</p>\n            <p>trades will never be pushed through if they are accepted with less than 2 days before a given week\'s games are scheduled to begin.</p>\n            <p>\n                if a trade is overturned, the franchises involved in the trade have the right to request a roll call of the who voted against the trade. those\n                franchises that voted against that trade will then be required to state the reasoning behind their vote within two days. the sb will then\n                deliberate and vote on the final outcome of this trade.<br />this process also must be allowed two full days. the sb then must make a best\n                effort to produce a ruling on the trade\'s outcome as quickly as possible to avoid any team receiving points from players that are not rightfully\n                theirs.\n            </p>\n            <p>any incidental points received from illegally owned players must count as is until the sb is able to determine a more fair process.</p>\n\n            <h3>trading draft picks</h3>\n            <p>offseason trades involving draft picks are allowed as long as they are considrered "equal value".</p>\n            <p>"equal value" amongst draft pick trades involves trading any number of pairs of draft picks between managers that does not result in a net\n                gain for either side.</p>\n            <p>in a 14 team league, an "equal value" trade between the managers with the first and last picks would be sending the 1st and 28th overall\n                draft selections for the 14th and 15th overall draft selections. in this case, the two draft picks sum up to the same number, so they are "equal\n                value".</p>\n            <p>the exectuion of this trade will proceed as follows. at the time of each manager\'s newly acquired pick, they must simply instruct the other\n                manager who to draft out of the player pool. the players are then traded between the teams following the completion of the draft but prior to\n                the start of the first scheduled game in week 1.</p>\n            <p>once a deal is reached between managers, it must be announced to the commish prior to the completion of the first of the draft picks invovled\n                for it to be official. once official, the commish retains the right to manually force the trade should either of the invovled parties get "cold\n                feet".</p>\n\n            <hr />\n            <h2 id="regular-season">regular season</h2>\n            <p>the regular season schedule will span from week 1 to week 13.</p>\n            <p>each team will play every other team once.</p>\n            <p>rosters are not locked all at once. instead, players are individually locked once their game\'s start time has passed.</p>\n            <p>it is each manager\'s responsibility to enusre rosters are properly set. if in the case of computer technical difficulties, said mananger may\n                reach out to the commish and inquire if he is able to get access to a computer to set the roster on behalf of the computer-less manager. this\n                can only be done on a best efforts basis by the commish.</p>\n            <p>the sb will in turn decide if the commish was negligent in his duties to help out the computer-less manager or if the computer-less manager\n                was in fact lying and merely creating a front for purposefully fixing a week\'s matchup. banning is an appropriate measure of discipline in\n                either of these cases if the sb deems it so.</p>\n\n            <hr />\n            <h2 id="playoffs">playoffs</h2>\n            <p>the three-round playoffs will take place during week 14 through week 16.</p>\n            <p>\n                the team that wins its respective division will be awarded a first round bye in the playoffs via a 1 or 2 seeding, determined by the relative\n                records and <a href="#">yahoo! fantasy football default tiebreakers</a> between these two teams.\n            </p>\n            <p>the four remaining wild card playoff spots will be determined irrespective of divisions. simply the four best remaining records (with yahoo!\n                fantasy football default tiebreakers included) garner seeds 3 through 6 for the playoffs.</p>\n            <p>teams eliminated from the post-season will be locked from making any roster moves.</p>\n\n            <hr />\n            <h2 id="payouts">payouts</h2>\n            <p>the payouts will be totaled in terms of units.</p>\n            <p>\n                1 unit is the equivalent of 1 team\'s entry fee. in this case, with no league fees other than the entry fee, 1 unit is <a href="#">$125</a>.\n            </p>\n            <table>\n                <tbody>\n                    <tr>\n                        <th>regular season points champion</th>\n                        <td>1 unit</td>\n                    </tr>\n                    <tr>--\n                    </tr>\n                    <tr>\n                        <th>1st place in post-season</th>\n                        <td>9 units</td>\n                    </tr>\n                    <tr>\n                        <th>2nd place in post-season</th>\n                        <td>3 units</td>\n                    </tr>\n                    <tr>\n                        <th>3rd place in post-season</th>\n                        <td>1 units</td>\n                    </tr>\n                </tbody>\n            </table>\n            <p>in addition to payouts, the last place team upon the completion of the regular season is required to perform the \'disgraceful punishment for\n                sucking so bad\'.</p>\n\n            <hr />\n            <h2 id="disgraceful-punishment-for-sucking">disgraceful punishment for sucking so bad</h2>\n            <p>this has yet to be determined.</p>\n            <p>but it should be as embarassing as this:</p>\n            <img\n                ng-src="http://placecorgi.com/720/480"\n                class="img-responsive">\n\n            <hr />\n            <h2 id="amendments">amendments</h2>\n            <p>all amendments proposed by active league managers must receive majority approval from the sb prior to the current season\'s scheduled draft\n                date.</p>\n            <p>all amendments proposed during the season will be reviewed at the end of the current season and not be made applicable to the current season.</p>\n            <p>all amendments to this charter will be named by the active league manager who caused or identified the problem.</p>\n            <!--\n            * new entry fee\n            * fathead process\n            * venmo \n            * 15 players on roster\n            # 60 second draft pick time\n             -->\n            <h3>venmo\'s aight, i guess</h3>\n            <p></p>\n\n            <h3>salary adjustment</h3>\n            <p></p>\n\n            <h3>the nagging charlie</h3>\n            <p></p>\n\n            <h3>fat head process</h3>\n            <p></p>\n\n            <h3>gone in sixty seconds</h3>\n            <p></p>\n        </div>\n    </div>\n</div>\n\n<footer class="footer">\n    <div class="container">\n        <p class="muted">hand rolled on january 21, 2016</p>\n    </div>\n</footer>');}]);})();