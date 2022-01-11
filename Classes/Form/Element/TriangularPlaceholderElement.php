<?php

namespace Blueways\BwPlaceholderImages\Form\Element;

use TYPO3\CMS\Backend\Form\Element\AbstractFormElement;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Fluid\View\StandaloneView;

class TriangularPlaceholderElement extends AbstractFormElement
{

    protected $defaultFieldWizard = [
        'localizationStateSelector' => [
            'renderType' => 'localizationStateSelector',
        ],
        'otherLanguageContent' => [
            'renderType' => 'otherLanguageContent',
            'after' => [
                'localizationStateSelector'
            ],
        ],
        'defaultLanguageDifferences' => [
            'renderType' => 'defaultLanguageDifferences',
            'after' => [
                'otherLanguageContent',
            ],
        ],
    ];

    public function render(): array
    {
        $resultArray = $this->initializeResultArray();

        $fieldWizardResult = $this->renderFieldWizard();
        $fieldWizardHtml = $fieldWizardResult['html'];
        $resultArray = $this->mergeChildReturnIntoExistingResult($resultArray, $fieldWizardResult, false);

        $view = GeneralUtility::makeInstance(StandaloneView::class);
        $view->setTemplatePathAndFilename('EXT:bw_placeholder_images/Resources/Private/Templates/TriangularPlaceholderElement.html');
        $view->assign('svg', $this->data['parameterArray']['itemFormElValue']);
        $view->assign('fieldWizardHtml', $fieldWizardHtml);

        $resultArray['html'] = $view->render();
        $resultArray['stylesheetFiles'][] = 'EXT:bw_placeholder_images/Resources/Public/Css/FileMetadataElements.css';

        return $resultArray;
    }
}
