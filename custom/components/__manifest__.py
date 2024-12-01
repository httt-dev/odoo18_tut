# -*- coding: utf-8 -*-
{
    'name': 'Component tutorial',
    'version':'18.0',
    'summary':'Component tutorial',
    'sequence':-1,
    'category': 'Undefined',
    'depends':['web','base'],
    'data':[],
    'installable': True,
    'application': True,
    'assets': {
        'web.assets_frontend': [
            'components/static/src/*',
        ],
        'web.assets_backend': [
            'components/static/src/**/*',
        ],
    },

}