+ function ($, window, undefined) {
    'use strict';

    var Uloader = function (element, options) {
        this.options = options
        this.$element = $(element)
    }

    Uloader.prototype.toggle = function () {
        return this[!this.isShown ? 'show' : 'hide']()
    }

    Uloader.prototype.show = function () {
        var self = this
        var e = $.Event('show.uloader')

        this.$element.trigger(e)
        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.$uloader = this.createUloader()

        this.$uloader.appendTo($('body'))
        
        this.setSize()

        $(window).off('resize.uloader').on('resize.uloader', function(){
            self.setSize()
        })
    }

    Uloader.prototype.hide = function () {
        
        var e = $.Event('hide.uloader')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.$uloader && this.$uloader.remove()
    }

    Uloader.prototype.createUloader = function () {
        var $uloader, html = '',
            $html = null,
            type = this.options.type

        if (this.options.uloader) {
            if (typeof this.options.uloader == 'string') {
                html = this.options.uloader
            } else {
                $html = $(this.options.uloader)
            }
        } else {
            type = this.isAvailable(type) ? type : 'text'
            html = this.options.template[type]['html']
        }

        $uloader = $('<div class="uloader-container">').html(html).append($html)

        return $uloader
    }

    Uloader.prototype.setSize = function(){
        
        var _offset = this.$element.offset()
        var _top = _offset.top
        var _left = _offset.left
        var _width = this.$element.outerWidth()
        var _height = this.$element.outerHeight()

        if(!this.options.border){
            _width -= parseInt(this.$element.css('borderLeft')) + parseInt(this.$element.css('borderRight')) || 0
            _height -= parseInt(this.$element.css('borderTop')) + parseInt(this.$element.css('borderBottom')) || 0
            _left += parseInt(this.$element.css('borderLeft')) || 0
            _top += parseInt(this.$element.css('borderTop')) || 0
        }

        this.$uloader.css({
            top: _top,
            left: _left,
            width: _width,
            height: _height,
            borderRadius: this.$element.css('borderRadius')
        })
    }
    
    Uloader.prototype.isAvailable = function (_type) {
        var self = this
        var result = true
        var css3 = this.options.template[_type]['css3']

        css3 && $.each(css3, function (key, val) {
            if (!self.css3Tester(val)) {
                result = false
                return false
            }
        })
        return result
    }

    Uloader.prototype.css3Tester = function (_type) {
        return $.fn.uloader.css3Tester(_type)
    }

    
    var old = $.fn.uloader

    $.fn.uloader = function (option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('uloader')
            var options = $.extend({}, $.fn.uloader.defaults, $this.data, typeof option == 'object' && option)

            if (!data) $this.data('uloader', (data = new Uloader(this, options)))

            if (data && typeof option == 'object') {
                data['hide']()
                $this.data('uloader', (data = new Uloader(this, options)))
            }
            
            if (typeof option == 'string') data[option]()
            else if (options.show) data.show()
        })
    }

    $.fn.uloader.defaults = {
        type: 'circle',
        show: true,
        border: true,
        template: {
            'text': {
                html: '<div class="uloader uloader-text">loading..</div>'
            },
            
            'rotating-plane': {
                html: '<div class="uloader spinkit-rotating-plane"><div class="spinner"></div></div>',
                css3: ['animation', 'transform']
            },
            
            'double-bounce': {
                html: '<div class="uloader spinkit-double-bounce"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>',
                css3: ['animation', 'transform']
            },
            
            'wave': {
                html: '<div class="uloader spinkit-wave"><div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></div>',
                css3: ['animation', 'transform']
            },
            'wandering-cubes': {
                html: '<div class="uloader spinkit-wandering-cubes"><div class="spinner"><div class="cube1"></div><div class="cube2"></div></div></div>',
                css3: ['animation', 'transform']
            },
            
            'pluse': {
                html: '<div class="uloader spinkit-pluse"><div class="spinner"></div></div>',
                css3: ['animation', 'transform']
            },
            
            'chasing-dots': {
                html: '<div class="uloader spinkit-chasing-dots"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div>',
                css3: ['animation', 'transform']
            },
            
            'three-bounce': {
                html: '<div class="uloader spinkit-three-bounce"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'  
            },
            
            'circle': {
                html: '<div class="uloader spinkit-circle"><div class="spinner"><div class="circle1 circle"></div><div class="circle2 circle"></div><div class="circle3 circle"></div><div class="circle4 circle"></div><div class="circle5 circle"></div><div class="circle6 circle"></div><div class="circle7 circle"></div><div class="circle8 circle"></div><div class="circle9 circle"></div><div class="circle10 circle"></div><div class="circle11 circle"></div><div class="circle12 circle"></div>
  </div></div>',
                css3: ['animation', 'transform']
            },
            
            'cube-grid': {
                html: '<div class="uloader spinkit-cube-grid"><div class="spinner"><div class="cube"></div><div class="cube"></div><div class="cube"></div><div class="cube"></div><div class="cube"></div><div class="cube"></div><div class="cube"></div><div class="cube"></div><div class="cube"></div></div></div>'
            },
            
            'fading-circle': {
                html: '<div class="uloader spinkit-fading-circle"><div class="spinner"><div class="circle1 circle"></div><div class="circle2 circle"></div><div class="circle3 circle"></div><div class="circle4 circle"></div><div class="circle5 circle"></div><div class="circle6 circle"></div><div class="circle7 circle"></div><div class="circle8 circle"></div><div class="circle9 circle"></div><div class="circle10 circle"></div><div class="circle11 circle"></div><div class="circle12 circle"></div></div></div>'
            },
            
            
            'css-loader-load1': {
                html: '<div class="uloader load1"><div class="loader"></div></div>',
                css3: ['animation', 'transform']
            },
            'css-loader-load2': {
                html: '<div class="uloader load2"><div class="loader"></div></div>',
                css3: ['animation', 'transform']
            },
            'css-loader-load3': {
                html: '<div class="uloader load3"><div class="loader"></div></div>',
                css3: ['animation', 'transform']
            },
            'css-loader-load4': {
                html: '<div class="uloader load4"><div class="loader"></div></div>',
                css3: ['animation', 'transform']
            },
            'css-loader-load5': {
                html: '<div class="uloader load5"><div class="loader"></div></div>',
                css3: ['animation', 'transform']
            },
            'css-loader-load6': {
                html: '<div class="uloader load6"><div class="loader"></div></div>',
                css3: ['animation', 'transform']
            },
            'css-loader-load7': {
                html: '<div class="uloader load7"><div class="loader"></div></div>',
                css3: ['animation', 'transform']
            },
            'css-loader-load8': {
                html: '<div class="uloader load8"><div class="loader"></div></div>',
                css3: ['animation', 'transform']
            }
        }
    }

    $.fn.uloader.css3Tester = function (propertyName) {

        var elm = document.createElement('div');
        propertyName = propertyName.toLowerCase();

        if (elm.style[propertyName] != undefined)
            return true;

        var propertyNameCapital = propertyName.charAt(0).toUpperCase() + propertyName.substr(1),
            domPrefixes = 'Webkit Moz ms O'.split(' ');

        for (var i = 0; i < domPrefixes.length; i++) {
            if (elm.style[domPrefixes[i] + propertyNameCapital] != undefined)
                return true;
        }

        return false;
    }

}(jQuery, window)