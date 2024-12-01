/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { ListRenderer } from "@web/views/list/list_renderer";

// https://codingdodo.com/owl-in-odoo-14-extend-and-patch-existing-owl-components/
// https://home.mycbms.com/2024/01/26/how-to-patch-existing-owl-component-in-odoo-16/

const unpatch = patch(ListRenderer.prototype, {
 // Define the patched method here
 setup() {
   console.log("List view patch started!");
   super.setup(...arguments);
 },

 // Define a new method
 _onClick(evt, record) {
    console.log(this)
    console.log("Event",evt);
    console.log("Clicked row data:", record);
 },

});

unpatch()