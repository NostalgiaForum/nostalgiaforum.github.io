var EWRcarta = window.EWRcarta || {};

!function($, window, document)
{
	// ################################## --- ###########################################
	
	EWRcarta.Masonry = XF.Element.newHandler(
	{
		init: function()
		{
			var $grid = this.$target.masonry(
			{
				itemSelector: '.carta-masonry-item',
			});
		},
	});
	
	// ################################## --- ###########################################
	
	EWRcarta.Tablesort = XF.Element.newHandler(
	{
		init: function()
		{
			var offset = 0;
			
			if ($('.p-navSticky').length)
			{
				offset = $('.p-navSticky').height();
			}
			
			this.$target.tablesorter(
			{
				widgets: ['zebra', 'cssStickyHeaders'],
				widgetOptions:
				{
					cssStickyHeaders_offset: offset,
				}
			});
		},
	});
	
	// ################################## --- ###########################################

	XF.Element.register('carta-masonry', 'EWRcarta.Masonry');
	XF.Element.register('carta-tablesort', 'EWRcarta.Tablesort');
}
(window.jQuery, window, document);