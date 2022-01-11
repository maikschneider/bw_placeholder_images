import $ = require('jquery');
import Notification = TYPO3.Notification;

class TriangularElement {
	constructor() {
		$('#triangular-refresh').on('click', this.onRefreshClick.bind(this));
		$('#triangular-delete').on('click', this.onDeleteClick.bind(this));
		$('#triangular-abort').on('click', this.onAbortClick.bind(this));
	}

	protected onRefreshClick(e: Event) {
		e.preventDefault();
		const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
		$.post(TYPO3.settings.ajaxUrls['triangular_refresh'], {
			sysFileUid: fileUid
		}).done((data) => {

			const wrapper = $('.form-triangular-placeholder');

			if (data.svg) {
				$('svg:first-child', wrapper).remove();
				wrapper.append(data.svg).removeClass('is-loading').addClass('is-downloaded');
				return;
			}

			wrapper.addClass('is-loading');
		});
	}

	protected onDeleteClick(e: Event) {
		e.preventDefault();
		const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
		console.log('onDeleteClick');
	}

	protected onAbortClick(e: Event) {
		e.preventDefault();
		const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
		$.post(TYPO3.settings.ajaxUrls['triangular_abort'], {
			sysFileUid: fileUid
		}).done((data) => {
			$('.form-triangular-placeholder').removeClass('is-loading');
		});
	}


}

export = new TriangularElement();
