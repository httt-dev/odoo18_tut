/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { AutoComplete } from "@web/core/autocomplete/autocomplete";

const unpatch = patch(AutoComplete.prototype,{
//    setup(){
//        console.log("AutoComplete patch started!");
//        super.setup(...arguments);
//    },

    onInputClick(){
        console.log("AutoComplete onInputClick patch started!");
        console.log(this);
        if (!this.isOpened) {
            console.log('Opening autocomplete dropdown...');
//            this.open(this.inputRef.el.value.trim() !== this.props.value);
            this.open(true);
        } else {
            this.close();
        }
//        super.onInputClick.call(this);
    }
});

unpatch();
