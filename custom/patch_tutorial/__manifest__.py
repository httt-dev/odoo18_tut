# -*- coding: utf-8 -*-
{
    'name': 'Patch tutorial',
    'version':'18.0',
    'summary':'Patch tutorial',
    'sequence':-1,
    'category': 'Undefined',
    'depends':['web','base'],
    'data':[],
    'installable': True,
    'application': True,
    'assets': {
        'web.assets_frontend': [
            'patch_tutorial/static/src/*',
        ],
        'web.assets_backend': [
            'patch_tutorial/static/src/**/*',
        ],
    },

}