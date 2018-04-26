

function Improve(data, sub) {

    for (let key in data) {
        let val = data[key];
        improve(val);
        Object.defineProperty(data, key, {
            configurable: true,
            get () {
                return val;
            },
            set (newVal) {
                if (val == newVal) {
                    return;
                }
                let old= {};
                old.val = val;
                val = newVal;
                improve(newVal);
                sub.notify();
            }
        })
    }

}

export default function improve(data, sub) {
    if (!data || typeof data !== 'object') {
        return
    } else {
        return new Improve(data, sub);
    }
}

