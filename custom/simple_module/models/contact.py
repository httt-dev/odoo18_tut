from odoo import models, fields


class AjsContact(models.Model):
    _name = 'ajs.contact'
    _description = 'Simple Contact'

    name = fields.Char()
    age = fields.Integer()
    desc = fields.Text()
