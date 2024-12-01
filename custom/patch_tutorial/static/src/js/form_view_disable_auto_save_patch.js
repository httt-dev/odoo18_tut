/** @odoo-module */

import { FormController } from "@web/views/form/form_controller";
import { patch } from "@web/core/utils/patch";
import { useSetupAction } from "@web/search/action_hook";
import {
    ConfirmationDialog,
} from "@web/core/confirmation_dialog/confirmation_dialog";
import { useService } from "@web/core/utils/hooks";

const unpatch = patch(FormController.prototype,{

    setup(){
        console.log("FormController patch started!",this);

        super.setup(...arguments);

        this.dialogService = useService("dialog");

        this.beforeLeaveHook = false;
        const modelName = this.props.resModel;

        this.onNotebookPageChange = (notebookId,page) =>{
            console.log("FormController onNotebookPageChange patch started!");
        }
    },

    async beforeLeave(){
        console.log("FormController beforeLeave patch started!");
        /* function will work before leave the form */
//        if(this.model.root.isDirty && this.beforeLeaveHook === false){
//            if(this.env.searchModel && this.env.searchModel.resModel !=modelName){
//                this.beforeLeaveHook = true;
//                 await this.model.root.save({
//                 reload: false,
//                 onError: this.onSaveError.bind(this),
//             });
//            }else {
//             this.beforeLeaveHook = true
//             this.model.root.discard();
//         }
//        }
        return;
    },

    async beforeUnload(ev) {
        console.log("FormController beforeUnload patch started!");
        ev.preventDefault(); // display dialog of browser to confirm
        return;

    },

    beforeVisibilityChange() {
        console.log("FormController beforeVisibilityChange patch started!");
        return;
    },

});


//unpatch();
