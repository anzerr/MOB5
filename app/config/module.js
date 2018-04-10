"use strict";

module.exports = function(config) {
	var load = {
		worker: ['generic', 'libary', 'react', 'client', 'event', 'socket']
	};

	return ({
		repository: {
			server: {
				url: '' // tmp
			},
			modules: [
				{
					name: 'generic',
					repo: 'https://github.com/anzerr/Module_Generic.git',
					commit: '24a5e76a8b211001c2edaad72cffed6195300d6f'
				},
				{
					name: 'libary',
					repo: 'https://github.com/anzerr/Module_Libary.git',
					commit: 'cebd1c14db29c7def61b7f33b2f739e14c489ba6'
				},
				{
					name: 'react',
					repo: 'https://github.com/anzerr/Module_react.git',
					commit: '0bc1f1007961fa5227340e63fb830add179e3ed3'
				},
				{
					name: 'gossip',
					repo: 'https://github.com/anzerr/Module_gossip.git',
					commit: '347b6f27d443aa68b12d25f89bc28b97bcdf54a4'
				}
			]
		},
		skipPrivate: config.skipPrivate || false,
		path: {
			module: config.path.app + '/module',
			remote: config.path.cache + '/module'
		},
		load: load[config.moduleProfile || config.appProfile]
	});
};
