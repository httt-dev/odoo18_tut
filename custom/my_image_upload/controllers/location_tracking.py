import base64

import werkzeug

from odoo import http
from odoo.http import request
import json
import firebase_admin
from firebase_admin import credentials, messaging


class GeoLogController(http.Controller):
    # Enable CORS for this route
    @http.route('/api/location_tracking', type='http', auth='user', methods=['POST'], cors='*', csrf=False)
    def location_tracking(self, **kwargs):
        headers = {'Content-Type': 'application/json'}
        body = {'results': {'code': 200, 'message': 'OK'}}
        headers = [('Content-Type', 'application/json')]
        request_id = None
        try:
            request_id = request.params.get('request_id')
            user_id = request.params.get('user_id')
            latitude = request.params.get('latitude')
            longitude = request.params.get('longitude')
            location_name = request.params.get('location_name')

            # Lấy file upload
            uploaded_file = request.httprequest.files.get('location_img')
            if uploaded_file:
                # Đọc file và mã hóa base64
                image_data = base64.b64encode(uploaded_file.read()).decode('utf-8')
            else:
                image_data = None

            # Kiểm tra tham số
            if not all([user_id, latitude, longitude, location_name]):
                data =json.dumps({ 'jsonrpc': '2.0',
                    'success': 0,
                    'error': {
                        'message': "Missing parameters",
                        'code': 400,
                        'data': None
                    },
                    'id': request_id})

                return request.make_response(data=data,headers=headers,status=400)

            # Lưu vào database
            geo_log_obj = request.env['user.location.tracking'].sudo()
            geo_log_obj.create({
                'user_id': user_id,
                'latitude': latitude,
                'longitude': longitude,
                'location_name': location_name,
                'location_img': image_data,
            })

            data = json.dumps({
                'jsonrpc': '2.0',
                'result': "ok",
                'id': request_id,
            })

            return request.make_response(data=data, headers=headers, status=200)

        except Exception as e:
            data = json.dumps({
                'jsonrpc': '2.0',
                'success' : 0,
                'error': {
                    'message': str(e),
                    'code': -100,
                    'data': None
                },
                'id': request_id,
            })
            # raise werkzeug.exceptions.HTTPException(description='Cannot convert into barcode.')
            return request.make_response(data=data, headers=headers, status=500)


    @http.route('/api/message', type='http', auth='none', methods=['GET'], cors='*', csrf=False)
    def test_message(self, **kwargs):
        print('message api')
        server_key = 'custom/my_image_upload/config/aip-wecare247-c914798de238.json'
        cred = credentials.Certificate(server_key)
        if not firebase_admin._apps:
            firebase_admin.initialize_app(cred)
        self.send_push_notification('faXllVJJRkKWqY4vZMJf23:APA91bGT2YGUqAQMGqkHQ2PtUrcg3QWO5ey-ZZGDb7GodRGy5Yl-2Vd1hpOSBmVmIzqZxbUAxfPyidjzfxgOxAPeHtwL_a5vQuw8tG15uwXxC8O_tVHIebI', 'Có sự thay đổi trong hệ thống Odoo!')

    @staticmethod
    def send_push_notification(token, message):
        # Tạo thông báo
        message = messaging.Message(
            notification=messaging.Notification(
                title="Thông báo từ Odoo",
                body=message,
            ),
            token=token,
        )

        # Gửi thông báo
        response = messaging.send(message)
        print('Successfully sent message:', response)
