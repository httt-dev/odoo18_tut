# -*- coding: utf-8 -*-

from odoo import http
from odoo.tools import html_escape, html_sanitize
from markupsafe import Markup


class QwebTutorials(http.Controller):
    @http.route('/qweb-tutorials', type='http',auth ='public')
    def qweb_tutorials(self):
        """QWEB tutorials """
        return http.request.render("qweb_tutorial.somePythonTemplate")