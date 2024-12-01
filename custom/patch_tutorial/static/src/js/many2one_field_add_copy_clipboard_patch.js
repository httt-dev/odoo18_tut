/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { Many2OneField } from "@web/views/fields/many2one/many2one_field";

const unpatch = patch(Many2OneField.prototype,{
//    setup(){
//        console.log("Many2OneField patch started!");
//        super.setup(...arguments);
//    },
    get hasCopyClipboardButton(){
        return true;
    },

    onCopyClipboard(){
       console.log(this)
       let id = this.props.id
       if(id){
           var copyItem = document.getElementById(id);
           console.log(copyItem.value)
           navigator.clipboard.writeText(copyItem.value);
       }
    }

});

//unpatch();