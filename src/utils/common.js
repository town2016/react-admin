export const storages = {
  set (key, value) {
    localStorage.setItem(key, value)
  },
  get (key) {
    return localStorage.getItem(key)
  },
  remove (key) {
    localStorage.removeItem(key)
  },
  check (key) {
    return localStorage.getItem(key) !== null && localStorage.getItem(key) !== undefined && localStorage.getItem(key) !== 'undefined'
  },
  clear () {
    localStorage.clear()
  }
}

export const sessions = {
  set (key, value) {
    sessionStorage.setItem(key, value)
  },
  get (key) {
    return sessionStorage.getItem(key)
  },
  remove (key) {
    sessionStorage.removeItem(key)
  },
  clear () {
    sessionStorage.clear()
  },
  check (key) {
    return sessionStorage.getItem(key) !== null && sessionStorage.getItem(key) !== undefined && sessionStorage.getItem(key) !== 'undefined'
  }
}

// 深度克隆
export function deepClone (obj) {
  let result
  let type = getDataType(obj)
  if (type === 'Object') {
    result = {}
  } else if (type === 'Array') {
    result = []
  } else {
    return obj
  }
  for (var k in obj) {
    var item = obj[k]
    if (getDataType(item) === 'Object' || getDataType(item) === 'Array') {
      result[k] = deepClone(item)
    } else {
      result[k] = item
    }
  }
  return result
}

/**
 * 数据类型判断
 * @param {Object} obj
 */
export function getDataType (obj) {
  if (obj === null) {
    return 'null'
  }
  if (obj === undefined) {
    return undefined
  }
  return Object.prototype.toString.call(obj).slice(8, -1)
}

// 删除对象的空属性
export function deleteEmptyAttr (obj) {
  for (var k in obj) {
    if (obj[k] === '') {
      delete obj[k]
    }
  }
  return obj
}

// 置空对象
export function resetObj (obj) {
  let result
  let type = getDataType(obj)
  if (type === 'Object') {
    result = {}
    for (var k in obj) {
      var item = obj[k]
      if (getDataType(obj) === 'Object') {
        result[k] = resetObj(item)
      } else {
        result[k] = ''
      }
    }
  } else if (type === 'Array') {
    result = []
  } else {
    return ''
  }
  return result
}

// 脱敏处理
export function messy (val, sign) {
  if (typeof val !== 'string') {
    val = ''
  }
  if (sign === 'phone') {
    let str1 = val.substr(0, 3)
    let str2 = val.substr(7, val.length - 1)
    val = str1 + '****' + str2
  }
  if (sign === 'idNumber') {
    var str1 = val.substring(0, 2)
    var str2 = val.substring(6, val.length - 1)
    var str3 = str2.substring(0, val.length - 4)
    val = str1 + '****' + str3 + '****'
  }
  return val
}

// 获取当前前后的时间
export function getDateStr(AddDayCount) {   
   var dd = new Date();  
   dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期  
   var y = dd.getFullYear();   
   var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  
   var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0  
   return y+"-"+m+"-"+d;   
}  
  