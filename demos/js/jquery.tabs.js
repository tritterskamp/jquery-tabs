/* 
jQuery Tabs 
https://github.com/tritterskamp/jquery-tabs
Example: $('.tabs').renderTabs(); 
*/

(function($) {

    $.fn.renderTabs = function(options) {
        // Establish our default settings
        var settings = $.extend({
            tabTitleContainer: '.tab-titles',
            tabTitles: 'li',
            tabTitleClass: 'title',
            tabTitleActiveClass: 'active',
            tab: '.tab-content > div',
            tabClass: 'tab',
            tabActiveClass: 'active',
            IdPrefix: 'tc',
            addHref: false,
            setup: null,
            complete: null
        }, options);
        
        this.each( function(i) {
            var $this = $(this),
                tabTitles = settings.tabTitleContainer + ' ' + settings.tabTitles;
            
            // SETUP CALL BACK FUNCTION
            if ( $.isFunction( settings.setup ) ) {
                settings.setup.call( this );
            }

            // SETUP:
            // set last-child class to last title
            $this.find(tabTitles + ':last-child').addClass('last-child');

            // SET UNIQUE IDS
            // for each tab component on page    
            var tcNum = settings.IdPrefix + (i + 1); // find the tab component number
                        
            // SET UP FOR EACH TAB
            $this.find(settings.tab).each(function(i) {
                $(this).addClass(settings.tabClass).attr({
                    'data-idx': i + 1,
                    'id': tcNum + '-s' + (i + 1)
                });
            });

            // SET UP FOR EACH TAB TITLE
            $this.find(tabTitles).each(function(i) {
                $(this).addClass(settings.tabTitleClass).attr({
                    'data-idx': i + 1
                });
                if (settings.addHref) {
                    $(this).wrapInner( '<a href="#' + $this.find(settings.tab).eq(i).attr('id') +'"></a>');
                } else {
                    $(this).find('a').attr('href', '#' + $this.find(settings.tab).eq(i).attr('id'));
                }
            });

            // when a tab-title link is clicked
            $this.find(tabTitles + ' a').click(function(e) {                
                e.preventDefault();
                var $titleLink = $(this);

                // SECTION SWITCHING
                var $thisSection = $($titleLink.attr('href')),
                    $thisTitle = $titleLink.parents('.title');
                // highlight active section title
                $thisTitle.siblings().removeClass(settings.tabTitleActiveClass);
                $thisTitle.addClass(settings.tabTitleActiveClass);
                // show/hide sections
                $thisSection.siblings().hide().removeClass(settings.tabActiveClass);
                $thisSection.fadeIn().addClass(settings.tabActiveClass);

            });

            // SECTION SET-UP
            // hide all sections
            $this.find(settings.tab).hide();
            //trigger click the first title link
            $this.find(tabTitles + ':first-child a').trigger('click');        

            // GO TO ANCHOR
            // does the url have a hash
            if (window.location.hash !== '') {    
                // look for object with the ID of your current hash
                if ($(window.location.hash).length > 0) {
                    // trigger click a tag that matches current hash
                    settings.tabTitleContainer.find('a[href*="' + window.location.hash + '"]').trigger('click');
                }
            }

            // ON COMPLETE CALLBACK FUNCTION
            if ( $.isFunction( settings.complete ) ) {
                settings.complete.call( this );
            }
                        
        });

    }
    
}(jQuery));