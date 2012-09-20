(function ($) {
    
    // do not change those defaults here, instead, pass them in a options
    // object when creating the styled checkboxes
    var defaults = {
        'checkedClass' : 'checked',
        'tick' : false,
        'tickClass': 'styled-checkboxes-tick',
        'tickContent': '&nbsp;',
        'wrapper' : 'div',
        'wrapperClass' : 'styled-checkboxes'
    };
    
    // after creation, this object holds all the settings
    var settings = {};
    
    // internal helpers
    var tickSelector = '';
    var tickElement = '';
    var wrapperSelector = '';
    
    // collection of methods the plugin can call like so:
    // $(selector).styledCheckboxes('methodName');
    // 
    // call without method name results in calling 'init'
    var methods = {       
           
        // setup and transform the checkboxes
        'init': function () {     
            wrapperSelector = settings.wrapper + '.' + settings.wrapperClass;
            if (settings.tick !== false) {
                tickSelector = settings.tick + '.' + settings.tickClass;
                tickElement = '<' + settings.tick + ' class="' 
                    + settings.tickClass + '">' + settings.tickContent 
                    + '</' + settings.tick + '>';
            }
                        
            // return chainable jQuery selection
            return this.map(function () {         
                var $this = $(this);
                var checked = $this.prop('checked') === true 
                    ? settings.checkedClass : '';                
                
                
                // wrap the checkbox
                $this.wrap('<' + settings.wrapper + ' class="' 
                    + settings.wrapperClass 
                    + ' ' + checked + '"/>');
                    
                if (settings.tick !== false) {
                    $this.before(tickElement);
                }
                         
                // attach        
                $this.parent(wrapperSelector).bind('click.styledCheckboxes', 
                    _methods.onClick);
                if ($this.parent(wrapperSelector).parent('label').length > 0) {
                    $this.parent(wrapperSelector).parent('label')
                        .bind('click.styledCheckboxes', _methods.onClick);
                }
                
                // return the wrapping div instead of the now invisible checkbox
                return $this.parent(wrapperSelector)[0];
            });
        }    
    };
    
    // private methods that can't be called form the outside
    var _methods = {
        
        'onClick': function (event) {
            console.log('onClick');
            
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
            
            console.log('contains checked checkbox: ' + $this.has('input[type="checkbox"]:checked').length);
            
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
        var options = {}; 
           
        if (typeof arguments[0] === 'object') {
            settings = $.extend(defaults, arguments[0]);
        } else {
            settings = defaults;
        }
                
        if (methods.method) {
            //
        } else {
            return methods.init.apply(this);
        }        
    }

})(jQuery); 

