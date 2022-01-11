import $ = require('jquery');
import Notification = require('TYPO3/CMS/Backend/Notification');

class TriangularElement {
	constructor() {
		$(() => {
			$('#triangular-refresh').on('click', this.onRefreshClick.bind(this));
			$('#triangular-delete').on('click', this.onDeleteClick.bind(this));
			$('#triangular-abort').on('click', this.onAbortClick.bind(this));
		});
	}

	protected onRefreshClick(e: Event) {
		e.preventDefault();
		const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
		$('.form-triangular-placeholder').addClass('is-loading').removeClass('is-waiting');
		$.post(TYPO3.settings.ajaxUrls['triangular_refresh'], {
			sysFileUid: fileUid
		}).done((data) => {
			$('.form-triangular-placeholder').removeClass('is-loading');
			if (data.svg) {
				$('.form-triangular-placeholder > svg').remove();
				$('.form-triangular-placeholder').prepend(data.svg).removeClass('is-waiting').addClass('is-downloaded');
				return;
			}
			if (!data.svg) {
				$('.form-triangular-placeholder').addClass('is-waiting');
				Notification.success('Well done', 'Whatever you did, it was successful.');
			}
		}).fail((err) => {
			console.error(err);
			$('.form-triangular-placeholder').removeClass('is-loading').addClass('is-waiting');
			Notification.error('Error', '', 3);
		});
	}

	protected onDeleteClick(e: Event) {
		e.preventDefault();
		const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
		$.post(TYPO3.settings.ajaxUrls['triangular_delete'], {
			sysFileUid: fileUid
		}).done((data) => {
			$('.form-triangular-placeholder').removeClass('is-loading').removeClass('is-downloaded').removeClass('is-waiting');
			$('.form-triangular-placeholder > svg').remove();
		});
	}

	protected onAbortClick(e: Event) {
		e.preventDefault();
		const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
		$.post(TYPO3.settings.ajaxUrls['triangular_abort'], {
			sysFileUid: fileUid
		}).done((data) => {
			$('.form-triangular-placeholder').removeClass('is-loading').removeClass('is-waiting');
		});
	}

}

export = new TriangularElement();
