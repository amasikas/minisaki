export class Observer{
    constructor(vm, item, fn){
        this.fn = fn;
        this.vm = vm;
        this.item = item;
        Subject.target = this;
        this.old = {
            "val": '',
            "index": ''
        };
        let val = eval("vm." + item);
        fn(val, this.old);
    }

    update(){
        let item = this.item;
        let vm = this.vm;
        let val = eval("vm." + item);
        this.fn(val, this.old);
    }
}

export class Subject{
    constructor(){
        this.subs = []
    }

    addSub(sub){
        this.subs.push(sub);
    }

    notify(oldVal){
        this.subs.forEach(sub => sub.update(oldVal));
    }
}