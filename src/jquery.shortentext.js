/**
 * jquery.shortentext.js 0.1
 * https://github.com/markwilson/jquery.shortentext.js
 *
 * Copyright (c) 2013 Mark Wilson (http://89allport.co.uk)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/04/15
 **/
(function ($) {
    $.fn.shortenText = function (options) {
        var settings = $.extend({
            strategy: 'rightTrim',
            widthFunction: 'outerWidth',
            ellipsis: '...',
            defaultExtensionLength: 4
        }, options);

        if (typeof settings.width === 'undefined') {
            throw Error('Width required in options')
        }

        $(this).each(function (i, e) {
            var element = $(e);

            var originalText = element.text();

            switch (settings.strategy) {
                case 'rightTrim':
                    var currentRightPos = originalText.length;
                    break;
                case 'leftTrim':
                    var currentLeftPos = 0;
                    break;
                case 'file':
                    var currentRightPos = originalText.lastIndexOf('.'),
                        extension;

                    if (currentRightPos < 0) {
                        currentRightPos = originalText.length - settings.defaultExtensionLength;
                    }

                    extension = originalText.substring(currentRightPos);
                    originalText = originalText.substring(0, currentRightPos);
                    break;
                default:
                    throw Error('Unrecognised strategy: ' + settings.strategy);
            }

            while (element[settings.widthFunction]() > settings.width) {
                switch (settings.strategy) {
                    case 'rightTrim':
                        element.text(originalText.substring(0, --currentRightPos) + settings.ellipsis);
                        break;
                    case 'leftTrim':
                        element.text(settings.ellipsis + originalText.substring(++currentLeftPos));
                        break;
                    case 'file':
                        element.text(originalText.substring(0, --currentRightPos) + settings.ellipsis + extension);
                        break;
                }
            }
        });
    }
})(jQuery);