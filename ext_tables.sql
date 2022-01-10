create table sys_file_metadata (
	dominant_colors        varchar(255) default '' not null,
	triangular_placeholder text,
);

create table tx_bwplaceholderimages_domain_model_queue (
	uid    int(11) unsigned default 0 not null auto_increment,
	pid    int(11) default 0 not null,

	hash varchar(255) default '' not null,
	file_identifier varchar(255) default '' not null,
	status int(11) default 0 not null,

	tstamp int(11) unsigned default 0 not null,
	crdate int(11) unsigned default 0 not null,

	primary key (uid),
	KEY    parent (pid),
);
