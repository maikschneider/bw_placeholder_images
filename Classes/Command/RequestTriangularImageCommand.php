<?php

namespace Blueways\BwPlaceholderImages\Command;

use Blueways\BwPlaceholderImages\Utility\TriangularUtility;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class RequestTriangularImageCommand extends Command
{

    protected TriangularUtility $triangularUtility;

    public function __construct(TriangularUtility $triangularUtility, string $name = null)
    {
        parent::__construct($name);
        $this->triangularUtility = $triangularUtility;
    }

    protected function configure()
    {
        $this->setHelp('Starts the routine of processing and downloading triangular images. When passing a file identifier, only this file will be processed');
        $this->addArgument(
            'fileIdentifier',
            InputArgument::OPTIONAL,
            'The image file to request a triangular image for'
        );
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $io->title($this->getDescription());

        if ($input->hasArgument('fileIdentifier')) {
            $this->triangularUtility->processFile($input->getArgument('fileIdentifier'));
            $io->writeln('Started triangular process for ' . $input->getArgument('fileIdentifier'));
            return Command::SUCCESS;
        }

        $io->writeln('@TODO: search all files..');
        return Command::SUCCESS;
    }
}
