from odoo import http
from odoo.http import request
from werkzeug.utils import secure_filename
import base64
import os


class ImageUploadController(http.Controller):

    @http.route('/api/upload_image', type='http', auth='public', methods=['POST'], csrf=False)
    def upload_image(self, **kwargs):
        # Kiểm tra xem có file trong request không
        if 'file' not in request.httprequest.files:
            return {'status': 'error', 'message': 'No file part'}

        file = request.httprequest.files['file']

        # Kiểm tra tên file
        if file.filename == '':
            return {'status': 'error', 'message': 'No selected file'}

        # Lưu file vào thư mục tạm của Odoo
        filename = secure_filename(file.filename)
        file_path = os.path.join(request.env['ir.config_parameter'].sudo().get_param('web.base.url'), 'custom_images',
                                 filename)
        file.save(file_path)

        # Lưu ảnh vào cơ sở dữ liệu của Odoo (file bây giờ có thể sử dụng trong các model)
        image_data = base64.b64encode(file.read())  # Đọc ảnh và mã hóa base64
        request.env['ir.attachment'].create({
            'name': filename,
            'type': 'binary',
            'datas': image_data,
            'mimetype': 'image/jpeg',
            'res_model': 'ir.ui.view',  # Có thể thay đổi theo model cần gắn ảnh
        })

        return {'status': 'success', 'message': 'File uploaded successfully'}



