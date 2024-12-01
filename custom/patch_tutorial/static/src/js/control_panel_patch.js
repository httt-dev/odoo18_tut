/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { Component, onWillUpdateProps, useState, useEffect , onWillStart} from "@odoo/owl";
import { ControlPanel } from "@web/search/control_panel/control_panel";

patch(ControlPanel.prototype,{
     setup() {
        console.log("ControlPanel patch started!");
        super.setup(...arguments);

        this.state = useState({
                ...this.state,
                customText: 'abc',
                });

        onWillStart(async () => {
            console.log("ControlPanel patch onWillStart!");
            try{
//                const response = await fetch('https://type.fit/api/quotes');
//                const data = await response.json();
//                const quote = data[Math.floor(Math.random() * data.length)];
                // Cập nhật state với dữ liệu mới
                this.state.customText = `New quote`;
            }catch (error) {
                this.state.customText = `${error}`;
                console.error('Error fetching quote:', error);
            }
        });

        onWillUpdateProps((nextProps) => {
            console.log("ControlPanel patch willUpdateProps!");
        });


     },


});