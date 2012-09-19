(function ($) {
    
    var wrapperSelector = '';
    var defaults = {
        'checkedClass' : 'checked',
        'wrapper' : 'div',
        'wrapperClass' : 'styled-checkboxes'        
    };
    var settings = {};
    
    var methods = {       
           
        'init': function (options) {            
            settings = $.extend(defaults, options);            
            wrapperSelector = settings.wrapper + '.' + settings.wrapperClass;
            
            // attach name spaced click event to wrapper or labels containing
            // a wrapper element
            $(document).on('click.styleCheckboxes', 
                '.styled-checkboxes, label:has(.styled-checkboxes)', 
                methods.onClick);
            
            // return chainable jQuery selection
            return this.map(function () {         
                var $this = $(this);
                var checked = $this.attr('checked') === 'checked' 
                    ? settings.checkedClass : '';                
                
                // wrap the checkbox
                $this.wrap('<' + settings.wrapper + ' class="' 
                    + settings.wrapperClass 
                    + ' ' + checked + '"/>');                
                
                // return the wrapping div instead of the now invisible checkbox
                return $(this).parent(wrapperSelector)[0];
            });
        },
        
        'onClick': function (event) {
            
            var $this = $(this).is('label') ? 
                $(this).find(wrapperSelector) : $(this);
            
            if (typeof event === 'object') {
                event.preventDefault();
                if ($(this).is(wrapperSelector)) {
                    // if the click was made on a wrapper, stop the event's
                    // bubbling so it won't trigger again on the label listener
                    event.stopPropagation();
                }
            }
            
            // add or remove visual 'checked' classes 
            if ($this.has('input[type="checkbox"]:checked').length === 1) {
                $this.removeClass(settings.checkedClass)
                    .find('input[type="checkbox"]').removeAttr('checked');
            } else {
                $this.addClass(settings.checkedClass)
                    .find('input[type="checkbox"]').attr('checked', 'checked');
            }
        }
        
    };
    
    $.fn.styledCheckboxes = function (method) {
    
        if (methods.method) {
            //
        } else if (typeof options === 'object') {
            return methods.init.apply(this, options);
        } else {
            console.log('init without options');
            return methods.init.apply(this, null);
        }        
    }

})(jQuery); 

