/* Augment function
 * 掺元类, 先创建一个包含各种通用方法的类,然后再用它扩充到其它类,这种包含通用方法的类称为掺元类(Mixin Class)
 * */
function augment(recevingClass, givingClass) {
    for (methodName in givingClass.prototype) {
        if (!recevingClass.prototype[methodName]) {
            recevingClass.prototype[methodName] = givingClass.prototype[methodName];
        }
    }
}

module.exports = augment;