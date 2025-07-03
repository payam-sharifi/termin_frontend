/*
	Highlights by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$html = $('html');

	// Breakpoints.
		breakpoints({
			large:   [ '981px',  '1680px' ],
			medium:  [ '737px',  '980px'  ],
			small:   [ '481px',  '736px'  ],
			xsmall:  [ null,     '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile) {

			var $wrapper;

			// Create wrapper.
				$body.wrapInner('<div id="wrapper" />');
				$wrapper = $('#wrapper');

				// Hack: iOS vh bug.
					if (browser.os == 'ios')
						$wrapper
							.css('margin-top', -25)
							.css('padding-bottom', 25);

				// Pass scroll event to window.
					$wrapper.on('scroll', function() {
						$window.trigger('scroll');
					});

			// Scrolly.
				$window.on('load.hl_scrolly', function() {

					$('.scrolly').scrolly({
						speed: 1500,
						parent: $wrapper,
						pollOnce: true
					});

					$window.off('load.hl_scrolly');

				});

			// Enable touch mode.
				$html.addClass('is-touch');

		}
		else {

			// Scrolly.
				$('.scrolly').scrolly({
					speed: 1500
				});

		}

	// Header.
		var $header = $('#header'),
			$headerTitle = $header.find('header'),
			$headerContainer = $header.find('.container');

		// Make title fixed.
			if (!browser.mobile) {

				$window.on('load.hl_headerTitle', function() {

					breakpoints.on('>medium', function() {

						$headerTitle
							.css('position', 'fixed')
							.css('height', 'auto')
							.css('top', '50%')
							.css('left', '0')
							.css('width', '100%')
							.css('margin-top', ($headerTitle.outerHeight() / -2));

					});

					breakpoints.on('<=medium', function() {

						$headerTitle
							.css('position', '')
							.css('height', '')
							.css('top', '')
							.css('left', '')
							.css('width', '')
							.css('margin-top', '');

					});

					$window.off('load.hl_headerTitle');

				});

			}

		// Scrollex.
			breakpoints.on('>small', function() {
				$header.scrollex({
					terminate: function() {

						$headerTitle.css('opacity', '');

					},
					scroll: function(progress) {

						// Fade out title as user scrolls down.
							if (progress > 0.5)
								x = 1 - progress;
							else
								x = progress;

							$headerTitle.css('opacity', Math.max(0, Math.min(1, x * 2)));

					}
				});
			});

			breakpoints.on('<=small', function() {

				$header.unscrollex();

			});

	// Main sections.
		$('.main').each(function() {

			var $this = $(this),
				$primaryImg = $this.find('.image.primary > img'),
				$bg,
				options;

			// No primary image? Bail.
				if ($primaryImg.length == 0)
					return;

			// Create bg and append it to body.
				$bg = $('<div class="main-bg" id="' + $this.attr('id') + '-bg"></div>')
					.css('background-image', (
						'url("assets/css/images/overlay.png"), url("' + $primaryImg.attr('src') + '")'
					))
					.appendTo($body);

			// Scrollex.
				$this.scrollex({
					mode: 'middle',
					delay: 200,
					top: '-10vh',
					bottom: '-10vh',
					init: function() { $bg.removeClass('active'); },
					enter: function() { $bg.addClass('active'); },
					leave: function() { $bg.removeClass('active'); }
				});

		});

	// Contact Form Submission
	$('#contact-form').on('submit', function(event) {
		event.preventDefault();

		var formData = {
			'name': $('input[name=name]').val(),
			'email': $('input[name=email]').val(),
			'message': $('textarea[name=message]').val()
		};

		$.ajax({
			type: 'POST',
			url: '/send-message',
			data: formData,
			dataType: 'json',
			encode: true
		})
		.done(function(data) {
			console.log(data);
			if (data.success) {
				alert('Nachricht erfolgreich gesendet!');
				$('#contact-form')[0].reset();
			} else {
				alert('Etwas ist schief gelaufen.');
			}
		})
		.fail(function(data) {
			console.log(data);
			alert('Etwas ist schief gelaufen.');
		});
	});

	// Accordion Toggle Logic
	$('.toggle-trigger').on('click', function() {
		var $this = $(this);
		var $content = $this.next('.toggle-content');
		var $parentLi = $this.closest('li');
		var $ul = $parentLi.parent();

		if ($content.is(':visible')) {
			// If already open, close it
			$content.slideUp(300);
			$parentLi.removeClass('focused open active');
			$ul.removeClass('focus-mode');
			$ul.children('li').fadeIn(300);
		} else {
			// Close all, then open the clicked one
			$('.toggle-content').slideUp(300);
			$('.services-list > li').removeClass('focused open active');
			$ul.removeClass('focus-mode');
			$ul.children('li').show();

			// Hide all other li, center the selected one
			$ul.addClass('focus-mode');
			$parentLi.addClass('focused open active');
			$ul.children('li').not($parentLi).fadeOut(300);
			$content.slideDown(300);
		}
	});

})(jQuery);