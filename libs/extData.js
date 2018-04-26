export default function extData(data) {
    for(let key in data){
        Object.defineProperty(this, key,{
            configurable: true,
            get(){
                return this._data[key];
            },

            set(newVal){
                this._data[key] = newVal;
            }

        });
    }
}