import $ = require('jquery');

class TriangularElement
{
	constructor() {
		$('#triangular-refresh').on('click', this.onRefreshClick.bind(this));
		$('#triangular-delete').on('click', this.onDeleteClick.bind(this));
		$('#triangular-abort').on('click', this.onAbortClick.bind(this));
	}

	protected onRefreshClick(e: Event) {
		e.preventDefault();
		const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
		console.log('onRefreshClick');
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
		});
		$('.form-triangular-placeholder').removeClass('is-loading');
	}


}
export = new TriangularElement();
