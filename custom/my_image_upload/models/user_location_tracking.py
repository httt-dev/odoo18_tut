from odoo import models, fields


class UserLocationTracking(models.Model):
    _name = 'user.location.tracking'
    _description = 'User Location Tracking'
    _check_company_auto = True

    user_id = fields.Many2one(comodel_name='res.users', index=True)
    # user_name = fields.Char(string='User Name', required=True, store=True)
    # user_id = fields.Integer(string='User ID', required=True)
    report_timing = fields.Datetime(string="Report timing")
    latitude = fields.Float(string='Latitude', required=True)
    longitude = fields.Float(string='Longitude', required=True)
    location_name = fields.Char(string='Location Name', required=True , index=True)
    location_img = fields.Binary(string="Location image", attachment=True)
