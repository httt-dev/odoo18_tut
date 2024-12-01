/** @odoo-module **/
import { Component, onWillStart, onMounted, useState, useExternalListener, useEffect, useRef } from "@odoo/owl";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
// Import the registry
import {registry} from "@web/core/registry";
import { useInputField } from "@web/views/fields/input_field_hook";
import {AssetsLoadingError, loadJS, loadCSS} from "@web/core/assets";

//https://codingdodo.com/create-field-widget-in-owl-odoo-16/

export class CodeField extends Component {
//    static template = xml`<pre t-esc="props.value" class="bg-primary text-white p-3 rounded"/>`;
    static template = "owl_learn.code_field";

    static props = {
        ...standardFieldProps,
        lang: 'js',
    };

    get acode(){
        return this.props.record.data[this.props.name] || "";
    }

    setup() {
        super.setup();

        this.textareaRef = useRef("textarea");

        useInputField({
            getValue: () => this.props.record.data[this.props.name] || "",
            refName: "textarea",
        });

        this.selectionStart = this.props.record.data[this.props.name]?.length || 0;

        onWillStart(async ()=>{
            console.log('Load external CSS/JS');

            try{
                await Promise.all([
                    loadJS("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"),
                    loadCSS("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"),
                ]);

            }catch(error){
                if (!(error instanceof AssetsLoadingError)) {
                    throw error;
                }
            }

        })

        onMounted(() =>{
            console.log('CodeField mounted' , hljs);
            hljs.highlightAll();
        })


    }

    async onBlur() {
        this.selectionStart = this.textareaRef.el.selectionStart;
    }

}

//CodeField.template =  "owl_learn.code_field";
//CodeField.props = {
//    ...standardFieldProps,
//
//}

export const codeField = {
    component: CodeField,
    supportedTypes: ["text"],
    extractProps(fieldInfo, dynamicInfo){
        return{
            readonly:dynamicInfo.readonly,

        }
    },
    supportedOptions: [
        {
            type: "field",
            availableTypes: ["text"],
        },
    ],

}

// Add the field to the correct category
registry.category("fields").add("acode", codeField);