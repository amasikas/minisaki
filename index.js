import improve from './libs/improve.js';
import extData from './libs/extData.js';
import Compile from './libs/compile.js';
import {Subject} from "./libs/ObserversSub.js";


export function MSaki(opt = {}) {
    this._options = opt;
    let data = this._data = this._options.data;
    let sub = new Subject();
    //增加set/get数据劫持接口
    improve(data, sub);
    //添加数据对象，方便通过对象直接获取数据内容
    extData.call(this, data);

    //编译数据
    new Compile(opt.el, this, sub);

    console.log(sub);

}
