(function() {
	'use strict';

	function FlcCtrl() {
		var vm = this;
	}

	angular.module( 'app.fairfieldLeagueConstitution', [ 'ui.router' ] )

	.config( function config($stateProvider) {
		$stateProvider.state( 'fairfieldLeagueConstitution', {
			url : '/fairfieldLeagueConstitution',
			templateUrl : 'fairfield-league-constitution.tmpl.html',
			controller : 'FlcCtrl',
			controllerAs : 'flc',
			data : {
				pageTitle : 'fairfield league constitution'
			}
		} );
	} )

	.directive( 'scrollSpy', function($window) {
		return {
			restrict : 'A',
			scope : {},
			controller : 'ScrollSpyCtrl',
			controllerAs : 'scrollSpy',
			bindToController : true,
			link : function($scope, elem, attrs, scrollSpy) {
				$( '#sidebar' ).affix( {
					offset : {
						top : $( 'header' ).height()
					}
				} );

				var spyElems = [];

				$scope.$watch( "scrollSpy.spies", function(spies) {
					var results = [];
					var len = spies.length;
					var i;
					for ( i = 0; i < len; i++ ) {
						var spy = spies[i];

						if ( spyElems[spy.id] == null ) {
							results.push( spyElems[spy.id] = elem.find( '#' + spy.id ) );
						}
					}
					return results;
				} );

				return $( $window ).scroll( function() {
					var highlightSpy = null;
					var ref = scrollSpy.spies;
					var len = ref.length;
					var i;
					for ( i = 0; i < len; i++ ) {
						var spy = ref[i];
						spy.out();

						var pos;
						if ( (pos = spyElems[spy.id].offset().top) - $window.scrollY <= 0 ) {
							spy.pos = pos;

							if ( highlightSpy == null ) {
								highlightSpy = spy;
							}

							if ( highlightSpy.pos < spy.pos ) {
								highlightSpy = spy;
							}
						}
					}

					if ( $( window ).scrollTop() + $( window ).height() >= $( document ).height() ) {
						spy.pos = pos;
						highlightSpy = spy;
					}

					return highlightSpy != null ? highlightSpy["in"]() : void 0;
				} );
			}
		}
	} )

	.directive( 'spy', function($location, $anchorScroll) {
		return {
			resrict : 'A',
			require : '^scrollSpy',
			link : function($scope, elem, attrs, scrollSpy) {
				elem.click( function() {
					$location.hash( attrs.spy );
					$anchorScroll();
				} );

				scrollSpy.addSpy( {
					id : attrs.spy,
					'in' : function() {
						return elem.addClass( 'active' );
					},
					'out' : function() {
						return elem.removeClass( 'active' );
					}
				} );
			}
		}
	} )

	.controller( 'FlcCtrl', [ FlcCtrl ] )

	.controller( 'ScrollSpyCtrl', [ '$scope', ScrollSpyCtrl ] );

	function FlcCtrl() {
		var vm = this;
	}

	function ScrollSpyCtrl() {
		var vm = this;

		vm.spies = [];

		vm.addSpy = function(spy) {
			vm.spies.push( spy );
		};
	}

	 angular.module("app.fairfieldLeagueConstitution").run(["$templateCache", function($templateCache) {$templateCache.put("fairfield-league-constitution.tmpl.html","<header class=\"masthead\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-5\">\n                <img ng-src=\"http://placecorgi.com/450/300\" alt=\"placeholder\" width=\"450\" height=\"300\">\n            </div>\n            <div class=\"col-md-7\">\n                <h1>\n                    fairfield football club\n                    <p class=\"lead\">a league constitution</p>\n                </h1>\n                <em>created on thursday, the twenty-fifth of july in god\'s year of two thousand and thirteen</em>\n            </div>\n        </div>\n    </div>\n</header>\n\n<div class=\"container\">\n    <div class=\"row\" scroll-spy>\n        <div class=\"col-md-3 sidebar\">\n            <ul class=\"nav nav-stacked affix\" id=\"sidebar\">\n                <li spy=\"preamble\"><a>preamble</a></li>\n                <li spy=\"sec1\"><a>founding league members</a></li>\n                <li spy=\"sec2\"><a>governing body</a></li>\n                <li spy=\"sec3\"><a>league members</a></li>\n                <li spy=\"sec4\"><a>league setup</a></li>\n                <li spy=\"sec5\"><a>draft process</a></li>\n                <li spy=\"sec6\"><a>roster moves</a></li>\n                <li spy=\"sec7\"><a>regular season</a></li>\n                <li spy=\"sec8\"><a>playoffs</a></li>\n                <li spy=\"sec9\"><a>payouts</a></li>\n                <li spy=\"sec10\"><a>disgraceful punishment for sucking</a></li>\n                <li spy=\"sec11\"><a>amendments</a></li>\n            </ul>\n        </div>\n\n        <hr />\n        <h2 id=\"preamble\">preamble</h2>\n        we the people of the fairfield football club fantasy football league, in order to form a more perfect union of sarcastically aggressive banter amongst\n        peers and grudgingly difficult transactions of personal finances, establish justification of smug condenscension at the peoples\' perceived knowledge of\n        the game of american football, insure domestic tranquility on the sundays, mondays, and occasional thursday and saturday that the people of the league\n        must keep sacred, provide for the common defence and offence with which the teams of the people prove their worth, promote the general welfare of all\n        players of the game of american football so they may remain free of heinous crime and veinous drug as they currently do so exist, and secure the\n        blessings of victory to thine self and thine own posterity, do ordain and establish this constitution for the fantasy football league of the fairfield\n        football club.\n\n\n        <hr />\n        <h2 id=\"sec1\">the founding league members</h2>\n        <p>the fairfield football club fantasy football league was founded by the following brave souls:</p>\n        <ul class=\"no-list-style\">\n            <li>adam \"white paul pierce\" barlow</li>\n            <li>chris \"red shorts\" banten</li>\n            <li>eric \"president big bush\" d\'elia</li>\n            <li>rob \"robby i-balls\" intrieri</li>\n            <li>charlie \"lord of the tale\" kollar</li>\n            <li>brendan \"glory boy\" lane</li>\n            <li>nick \"the dick-tator\" makes</li>\n            <li>brian \"black irish\" mcardle</li>\n            <li>rob \"the wedding planner\" pigue</li>\n            <li>dan \"statman (\'ski bi di bi di do bap do\')\" pogoda</li>\n            <li>mark \"daddy\'s boy\" rodgers</li>\n            <li>alex \"deep v\'s & tight jeans\" voucas</li>\n            <li>mike \"the yurkinator\" yurkerwich</li>\n        </ul>\n        <p>and also founded by:\n        <ul class=\"no-list-style\">\n            <li>rich \"dicky v\" velotta</li>\n        </ul>\n\n        <hr />\n        <h2 id=\"sec2\">governing body</h2>\n\n        <h3>the senior board (the sb)</h3>\n        <p>the senior board, herafter referred to as the sb, will be comprised of 4 active league managers.</p>\n        <p>active league managers are defined as persons managing (or co-managing) a fantasy football team for the upcoming and/or current nfl season. their\n            status as an active league manager is not determined nor affected by seasons prior or future.</p>\n        <p>\n            the sb will be responsible for selecting or re-administering the commish prior to each fantasy season\'s draft day, each year.<br />in the event of\n            a tied vote for a new commish, the vote will then be opened up to the rest of the league. in the event this vote still remains tied, the league\'s\n            most recent commish, who still remains an active league manager, will reside as the current year\'s commish.\n        </p>\n        <p>active league managers may choose to step down from residing on the sb during any off-season but not in the middle of the fantasy season, and it\n            will become the remaining sb\'s duty to select a new member at such a time.</p>\n        <p>the sb will handle all issues such as league complaints and suggestions towards enhancing the league\'s settings. input shall be accepted from any\n            active league manager by the sb, who will in turn decide whether or not this issue needs resolving.</p>\n\n        <h3>the league commissioner (the commish)</h3>\n        <p>the commish does not have autonomous rule over the league and may be removed from office through a vote by the sb (either unanimously or with at\n            most one vote of contention).</p>\n        <p>the commish will be responsible for running day-to-day operations of the league in the fairest manner possible; subsequently requiring the\n            commish to interpret the terms outlined in this charter in conjunction with the rules provided by yahoo! fantasy football in order to deem the most\n            appropriate course of action.</p>\n        <p>the commish is responsible for ensuring league continuity from season to season.</p>\n        <p>the commish is responsible for maintaining and updating this charter when deemed necessary by the sb.</p>\n        <p>the commish is responsible for handling all league finances related to collection and distribution.</p>\n\n        <hr />\n        <h2 id=\"sec3\">league members</h2>\n\n        <p>as this is the inaugural season for this league\'s formalities, the commish has took it upon himslef to initially elect the members of the sb\n            based upon past exemplified enthusiasm for the sport:</p>\n        <ul class=\"no-list-style\">\n            <li>adam \"white paul pierce\" barlow</li>\n            <li>chris \"red shorts\" banten</li>\n            <li>eric \"president big bush\" d\'elia</li>\n            <li>mark \"daddy\'s boy\" rodgers</li>\n        </ul>\n        <p>there will be 14 league managers per season, no more and no less.</p>\n        <p>should a different number of managers be required for any season, this addition/subtraction must occur in twos.</p>\n        <p>all returning managers retain the right for \"first dibs\" on procuring a team for the next season provided they have not been previously banned.</p>\n\n        <h3>bannings</h3>\n        <p>bannings will be instituted by the sb based on a majority vote and must be upheld for a minimum of 1 season and a maximum of a lifetime sentence.</p>\n        <p>bannings will be issued as a result of franchise negligence, failure to pay league fees in a timely manner and/or for reasons currently beyond\n            comprehension but for which, at said time, the sb demms banning appropriate through majority vote.</p>\n        <p>the sb, in conjunction with the commish, will be responsible for setting the weekly lineup for any and all banned franchises during mid-season to\n            ensure fair matchups for all managers throughout the season. a banned franchise will not allowed to pick up free agents via the waiver wire and will\n            have to wait until the waiver period has ended before picking up any necessary position players to field a full roster.</p>\n\n        <hr />\n        <h2 id=\"sec4\">league setup</h2>\n\n        <h3>league fees</h3>\n        <p>league fees will equal the entry fee for each manager. currently there are no league setup fees due to the use of a paid third party vendor.</p>\n        <p>\n            the entry fee, which constitutes each manager\'s contributions to the league\'s prize pool, is <a href=\"#\">$125</a>.\n        </p>\n        <p>\n            league fees will be due by 11:59pm on the sunday prior to week 1\'s first scheduled game. this means they must reach the commish by this time either\n            in person or via PayPal.\n            <del>the commish has no interest in signing up for venmo at this time.</del>\n            yeah that was dumb, venmo\'s great.\n        </p>\n        <p>as noted before, failure to pay league fees will result in deliberation of the sb to determine if banning is required.</p>\n\n        <h3>rosters</h3>\n        <p>\n            each team roster will be comprised of <a href=\"#\">15</a> players. at a minimum, a team must field an active qb, 2 rbs, 2 wrs, 1 te, 1 flex player\n            (defined as a rb, wr, or te), 1 k, and 1 d/st.\n        </p>\n        <p>should a manager neglect these rules, the sb will deliberate whether or not these actions were intentional with premeditated malice towards\n            blemishing the integrity of the league.</p>\n        <p>a banning may be a suitable punishment in this instance. you jerk.</p>\n\n        <h3>scoring</h3>\n        <p>\n            specific points per football play are defined on the league\'s home page under the <a href=\"#\">\"scoring and settings\"</a> section. i\'m not typing\n            those out.\n        </p>\n        <p>negative points and decimal points will be implemented.</p>\n        <p>this is not a points per reception league nor do encourage the use of bonus points.</p>\n        <p>\n            the league will adhere to any and all stat corrections deemed appropriate by <a href=\"#\">yahoo! fantasy football</a>, in addition to any of the\n            matchup result repercussions that may occur afterwards.\n        </p>\n\n        <p>the sb can also choose to implement stat corrections based on majority vote. the commish will in turn edit the matchup results where appropriate\n            based on the advice provided by the sb.</p>\n\n        <h3>divisions</h3>\n        <p>\n            there will be two 7-team divisions: <a href=\"https://www.youtube.com/watch?v=rqdxHwaxrNM\">cuttlefish & asparagus vs. vanilla paste</a>.\n        </p>\n        <p>teams will be placed into divisions based on their draft order of the current season. all odd numbered draft picks in round 1 will be placed in\n            cuttlefish & asparagus and all even numbered draft picks in round 1 will be placed in vanilla paste.</p>\n        <p>the teams that win their respective divisions will subsequently be guaranteed one of the top two seeds for the post season.</p>\n        <p>\n            the win-loss records, in addition to <a href=\"#\">yahoo! fantasy sport\'s</a> default tiebreaking rules, will determine this relative seeding.\n        </p>\n        <p>the divisions become irrelevant when deciding the four additional wild card spots in the post-seasons. simply the next four best teams will be\n            competing for the championship.</p>\n\n        <strong>halftime</strong>\n        <div class=\"row\">\n            <div class=\"col-md-4\">\n                <img ng-src=\"http://placecorgi.com/720/480\" class=\"img-responsive\">\n            </div>\n            <div class=\"col-md-4\">\n                <img ng-src=\"http://placecorgi.com/720/480\" class=\"img-responsive\">\n            </div>\n            <div class=\"col-md-4\">\n                <img ng-src=\"http://placecorgi.com/720/480\" class=\"img-responsive\">\n            </div>\n        </div>\n\n        <hr />\n        <h2 id=\"sec5\">draft process</h2>\n\n        <p>it is expected that all active league managers make reasonable attempts at arranging and joining a draft day party. it is expected this party\n            have plenty of beers, either a grill for barbecue or a table for pizza, ample seating, ample electical outlets, and ample wifi.</p>\n        <p>the draft order will be determined in a random fashion. the commish and at least one active league manager must video tape this process and\n            publish it to the league so that no fraudulent behavios is possible.</p>\n        <p>\n            managers will have <a href=\"#\">60</a> seconds to select a draft pick in each round.\n        </p>\n        <p>any active league manager who is able to draft purple jesus before he is able to fall to mark rodgers immediately becomes a favorite of the\n            commish for that football season. this applies for any future all-stars that may play for the minnesota vikings as well (doubtful).</p>\n        <p>the draft will be of a snake type where picks are made sequentially and not in auction format.</p>\n        <p>the draft date must occur after the first scheduled preseason game is played but before the first scheduled regular season game is played.</p>\n        <p>outside of those draft date boundaries, a best effort must be made by the commish to select a date that ensures a maximum number of managers may\n            attend the draft to avoid auto-picking.</p>\n\n        <hr />\n        <h2 id=\"sec6\">roster moves</h2>\n\n        <h3>add/drop players</h3>\n        <p>any player dropped from a team will immediately be placed on waivers in accordance with the leagues settings.</p>\n        <p>\n            the league will utilize yahoo! fantasy football\'s proprietary <a href=\"#\">\"can\'t cut\" list</a>.\n        </p>\n\n        <h3>waivers</h3>\n        <p>the waiver period will be from game time to tuesday.</p>\n        <p>game time means that all unowned players will be placed on waivers at the scheduled start time of their game. in game time waivers, players on a\n            bye week will be placed on waivers monday night at 8:30pm est.</p>\n        <p>tuesday means that the claim period ends at 2:59am est on wednesday morning, or thereabouts.</p>\n        <p>once the claim period ends, every team\'s waiver claims will be executed on a priority basis. if two teams have a waiver claim on the same player,\n            the team with a higher priority will receive said player.</p>\n        <p>waiver priority initially begins as the reverse of the draft order. once a team has a waiver claim processed successfully, they immediately drop\n            to the bottom of the waiver priority list.</p>\n\n        <h3>trades</h3>\n        <p>active league managers have 2 days to protest any pending league trades.</p>\n        <p>a minimum of 1/3 of the league needs to protest a trade for it to be vetoed. for a 14 team league, this means a minimum of 5 votes.</p>\n        <p>trades will never be pushed through if they are accepted with less than 2 days before a given week\'s games are scheduled to begin.</p>\n        <p>\n            if a trade is overturned, the franchises involved in the trade have the right to request a roll call of the who voted against the trade. those\n            franchises that voted against that trade will then be required to state the reasoning behind their vote within two days. the sb will then deliberate\n            and vote on the final outcome of this trade.<br />this process also must be allowed two full days. the sb then must make a best effort to produce a\n            ruling on the trade\'s outcome as quickly as possible to avoid any team receiving points from players that are not rightfully theirs.\n        </p>\n        <p>any incidental points received from illegally owned players must count as is until the sb is able to determine a more fair process.</p>\n\n        <h3>trading draft picks</h3>\n        <p></p>\n\n        <hr />\n        <h2 id=\"sec7\">regular season</h2>\n\n        <hr />\n        <h2 id=\"sec8\">playoffs</h2>\n\n        <hr />\n        <h2 id=\"sec9\">payouts</h2>\n\n        <hr />\n        <h2 id=\"sec10\">disgraceful punishment for sucking so bad</h2>\n        <img ng-src=\"http://placecorgi.com/720/480\" class=\"img-responsive\">\n\n        <hr />\n        <h2 id=\"sec11\">amendments</h2>\n        <!--\n            * new entry fee\n            * fathead process\n            * venmo \n            * 15 players on roster\n            # 60 second draft pick time\n             -->\n    </div>\n</div>\n</div>\n\n<footer class=\"footer\">\n    <div class=\"container\">\n        <p class=\"muted\">hand rolled on january 21, 2016</p>\n    </div>\n</footer>");}]);
}());
