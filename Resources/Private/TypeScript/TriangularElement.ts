import $ = require('jquery');

class TriangularElement {
	constructor() {
		$('#triangular-refresh').on('click', this.onRefreshClick.bind(this));
		$('#triangular-delete').on('click', this.onDeleteClick.bind(this));
		$('#triangular-abort').on('click', this.onAbortClick.bind(this));
	}

	protected onRefreshClick(e: Event) {
		e.preventDefault();
		const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
		$('.form-triangular-placeholder').addClass('is-loading');
		$.post(TYPO3.settings.ajaxUrls['triangular_refresh'], {
			sysFileUid: fileUid
		}).done((data) => {
			if (data.svg) {
				$('.form-triangular-placeholder > svg').remove();
				$('.form-triangular-placeholder').prepend(data.svg).removeClass('is-loading').addClass('is-downloaded');
				return;
			}
			if (!data.svg) {
				console.log('message: is queued');
			}
		});
	}

	protected onDeleteClick(e: Event) {
		e.preventDefault();
		const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
		$.post(TYPO3.settings.ajaxUrls['triangular_delete'], {
			sysFileUid: fileUid
		}).done((data) => {
			$('.form-triangular-placeholder').removeClass('is-loading').removeClass('	is-downloaded');
			$('.form-triangular-placeholder > svg').remove();
		});
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
