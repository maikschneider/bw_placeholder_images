<?php
namespace Blueways\BwPlaceholderImages\Service;

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
use TYPO3\CMS\Core\SingletonInterface;

/**
 * Class GifBuilderService
 * @package Blueways\BwPlaceholderImages\Service
 */
class Base64ImageService implements SingletonInterface
{
    public function generateSvg($color, $width = 1, $height = 1)
    {
        $colors = json_decode($color);

        if(!count($colors)) return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ".$width." ".$height."'%3E%3Crect width='100%25' height='100%25' fill='%23".substr($color, 1)."' /%3E%3C/svg%3E";

        for($i=0;$i<count($colors);$i++){
            for($j=0;$j<count($colors[$i]);$j++){
                $colors[$i][$j] = substr($colors[$i][$j], 1);
            }
        }
        $height05 = ceil($height / 2);

        $svg = "data:image/svg+xml,%3csvg viewBox='0 0 ".$width." ".$height."' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3clinearGradient id='b'%3e%3cstop offset='0' stop-color='%23".$colors[0][0]."'/%3e%3cstop offset='50%25' stop-color='%23".$colors[1][0]."'/%3e%3cstop offset='100%25' stop-color='%23".$colors[2][0]."'/%3e%3c/linearGradient%3e%3clinearGradient id='c'%3e%3cstop offset='0' stop-color='%23".$colors[2][0]."'/%3e%3cstop offset='50%25' stop-color='%23".$colors[2][1]."'/%3e%3cstop offset='100%25' stop-color='%23".$colors[2][2]."'/%3e%3c/linearGradient%3e%3clinearGradient id='d' x2='0' y2='1'%3e%3cstop offset='0' stop-color='%23".$colors[1][0]."'/%3e%3cstop offset='50%25' stop-color='%23".$colors[1][1]."'/%3e%3cstop offset='100%25' stop-color='%23".$colors[1][2]."'/%3e%3c/linearGradient%3e%3clinearGradient id='a' x2='0' y2='1'%3e%3cstop offset='0' stop-color='white' stop-opacity='0'/%3e%3cstop offset='50%25' stop-color='white'/%3e%3cstop offset='100%25' stop-color='white' stop-opacity='0'/%3e%3c/linearGradient%3e%3cmask id='e'%3e%3cpath fill='url(%23a)' d='M0 0h".$width."v".$height."H0z'/%3e%3c/mask%3e%3c/defs%3e%3cpath fill='url(%23b)' d='M0 0h".$width."v".$height05."H0z'/%3e%3cpath fill='url(%23c)' d='M0 ".$height05."h".$width."v".$height05."H0z'/%3e%3cpath fill='url(%23d)' mask='url(%23e)' d='M0 0h".$width."v".$height."H0z'/%3e%3c/svg%3e";

        return $svg;
    }
}
