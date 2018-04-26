import {Observer, Subject} from './ObserversSub.js';


export default class Compile {

    constructor(elem, vm, sub) {
        this.vm = vm;
        this.sub = sub;
        vm._elem = document.querySelector(elem);

        let fragmentBuffer = document.createDocumentFragment();
        let child = "";
        while (child = vm._elem.firstChild) {
            fragmentBuffer.appendChild(child);
        }

        this.replace(fragmentBuffer);
        vm._elem.appendChild(fragmentBuffer);
    }

    replace(frag) {
        const _this = this;
        Array.from(frag.childNodes).forEach(node => {
            let text = node.textContent;
            let reg = /\{\{(.*?)\}\}/g;

            if (node.nodeType == 3 && reg.test(text)) {
                let result = text.match(reg);
                Array.from(result).forEach(item => {
                    let n_item = item.replace(/\{\{|\}\}/g, '');

                    //text=text.replace(item, eval("_this.vm." + n_item));
                    let observer = new Observer(_this.vm, n_item, (val, old) => {

                        if (old.val!="") {
                            item = old.val;
                        }
                       // text=text.replace(item,val);
                        const re =new RegExp(item,"g");
                        text = text.replace(re, (target, index, source) => {
                            if(old.index == ""){
                                old.index = index;
                            }
                            if(index == old.index){
                                old.val=val;
                                return val;
                            }else{
                                return item;
                            }

                        });
                        node.textContent = text;
                    });
                    _this.sub.addSub(observer);
                });

            }

            if (node.childNodes && node.childNodes.length) {
                _this.replace(node);
            }


        });
    }
}