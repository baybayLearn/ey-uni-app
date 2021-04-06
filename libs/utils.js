export default utils = {
	//判断是否是电话号码
	isMobile(str) {
		return new RegExp(/^\d{11}$/).test(str)
	},
	//是否有效身份证
	isIdCard(str) {
		const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
		return new RegExp(reg).test(str)
	},
	//判断是否邮政编码
	isPostCode(str) {
		return new RegExp(/^\d{6}$/).test(str)
	}
	//判断是否是有效邮箱
	isEmail(str) {
		return new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(str)
	}
	//判断是否是有效税号
	isTaxNo(str) {
		return new RegExp(/[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/).test(str)
	},
	//判断是否字符串
	isString(str) {
		return Object.prototype.toString.call(str) === '[object String]'
	},
	//判断是否数值
	isNumber(num) {
		return Object.prototype.toString.call(num) === '[object Number]'
	},
	//判断是否undefined
	isUndefined(obj) {
		return Object.prototype.toString.call(obj) === '[object Undefined]'
	},
	// 判断是否为null值
	isNull(obj) {
		return Object.prototype.toString.call(obj) === '[object Null]'
	},
	// 判断是否为bool值
	isBoolean(obj) {
		return Object.prototype.toString.call(obj) === '[object Boolean]'
	},
	// 判断是否为函数
	isFunction(obj) {
		return Object.prototype.toString.call(obj) === '[object Function]'
	},
	// 判断是否为日期
	isDate(obj) {
		return Object.prototype.toString.call(obj) === '[object Date]'
	},
	// 判断是否为数组
	isArray(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]'
	},
	// 判断是否为对象
	isObject(obj) {
		return Object.prototype.toString.call(obj) === '[object Object]'
	},

	/**
	 * 获取随机数值
	 * @param {Object} start
	 * @param {Object} end 结束值，若无值，默认是开始值的2倍
	 */
	random(start, end) {
		end = end || start + start
		return Math.round(Math.random() * (end - start)) + start
	},
	/**
	 * 获取随机字符串 [0-9][A-F]的字符串，不区分大小写
	 * 字符串长度一般是 10-11位
	 * 一般可用于做临时的key
	 */
	randomKey() {
		return Math.random().toString(36).substr(2)
	}
	/**
	 * 生成随机字符串
	 * @param {Object} len 生成字符串的长度（非固定长度时表示最小长度）
	 * @param {Object} maxLen  最大长度（固定长度时则不需要传入）
	 */
	randomStr(len, maxLen) {
		let str = ""
		let range = maxLen ? Math.round(Math.random() * (maxLen - len)) + len : len //有最大长度时，产生一个随机长度
		let tmp = "0123456789ABCDEFGHIJKLMNOPKRSTUVWXYZabcdefghijklmnopkrstuvwxyz"
		for (let i = 0; i < range; i++) {
			let pos = Math.round(Math.random() * (tmp.length - 1))
			str += tmp.charAt(pos)
		}
		return str
	},
	//清除字符串两边空格
	trim(str) {
		return String(str).replace(/(^\s*)|(\s*$)/g, '')
	}
	/**
	 * 清除对象属性值两边空格
	 * @param {Object} obj :对象
	 */
	trimAll(obj) {
		let tmpArr = Object.keys(obj)
		tmpArr.forEach(x => {
			if (typeof obj[x] == 'string') {
				obj[x] = this.trim((obj[x]))
			}
		})
	},
	/**
	 * 将当前字符串的首个字符变为大写
	 * @param {Object} str 字符串
	 */
	toFirstUpper(str) {
		return str.replace(/(\w)/, function(v) {
			return v.toUpperCase()
		})
	},
	/**
	 * @param {Object} str 需要补全的字符
	 * @param {Object} num 总共需要达到的字符个数
	 * @param {Object} ch  使用什么字符来补充
	 */
	padStart(str, num, ch) {
		str = String(str)
		if (Object.prototype.toString.call(str.padStart) == '[object Function]') { //ES2017的方法
			return str.padStart(num, ch) //向前不全字符，num返回字符串长度，ch补全的字符串
		} else {
			num += ''
			len -= num.length
			for (let i = 0; i < len; i++) num = ch + num
			return num
		}
	},
	/**
	 * 判断某个值v是否在数组arr中
	 * @param {Object} v 值
	 * @param {Object} arr 数组
	 */
	inArray(v, arr) {
		if (Object.prototype.toString.call(arr) !== '[object Array]') {
			return false
		}
		for (let i = 0; i < arr.length; i++) {
			if (v === arr[i]) {
				return true
			}
		}
		return false
	}
	/**
	 * 格式化价格（包含千分位、两位小数）
	 * @param {Object} 数组
	 */
	formatPrice(price) {
		let n = parseFloat(price).toFixed(2)
		let re = /(\d{1,3})(?=(\d{3})+(?:\.))/g
		return n.replace(re, '$1,')
	},
	/**
	 * 将数值 转为大写书写方式
	 * @param {Object} num 数值
	 */
	toUpperNum(num) {
		const numChar = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
		const unitChar = ['', '拾', '佰', '仟']
		const unitSection = ['', '万', '亿', '万亿', '亿亿']
		var returnStr = '' //返回值
		var unitPos = 0
		var unitSec = -1
		var strIns = ''
		var zero = true //最后一个值是不是0
		while (num > 0) {
			var n = num % 10 //找到最后一个值
			if (n === 0) {
				if (!zero) {
					zero = true
					returnStr = numChar[n] + returnStr
				}
				if (unitPos % 4 == 0) { //解决10010(万位是0时需要添加万)
					unitSec++
					unitPos = 0
					returnStr = unitSection[unitSec] + returnStr
				}
			} else {
				zero = false;
				strIns = numChar[n];
				if (unitPos % 4 == 0) {
					unitSec++
					unitPos = 0
					strIns += unitSection[unitSec]
				} else {
					strIns += unitChar[unitPos];
				}
				returnStr = strIns + returnStr
			}
			unitPos++
			num = Math.floor(num / 10); //重新给num赋值，以便下次循环找到前一个值
		}
		return returnStr
	},
	/**
	 * 将日期字符串 转为日期对象
	 * @param {Object} str 日期字符串，如：2021-03-31
	 */
	toDate(str) {
		str = str.replace(/-/g, '/')
		return new Date(str)
	},
	/**
	 * 将服务器返回的时间改为时间戳
	 * @param {Object} serverTimeString 服务返回的时间
	 */
	getTimestamp: function(serverTimeString) {
		if (!serverTimeString) return 0
		if (!this.isString(serverTimeString)) {
			serverTimeString = String(serverTimeString)
		}
		let m = serverTimeString.match(/Date\(([\d-]+)\)/)
		if (m && m[1]) {
			return parseInt(m[1])
		}
		return 0
	},
	/** 
	 * @param {Object} date 日期字符串或日期类型
	 * @param {Object} format
	 */
	formatDate(date, format) {
		if (Object.prototype.toString.call(date) === '[object String]') {
			date = this.toDate(date) //若是字符串，先转为日期
		} else if (Object.prototype.toString.call(date) !== '[object Date]') {
			return date //不是日期，直接返回传入的值
		}
		const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
		let cfg = {
			yyyy: date.getFullYear(), //4位年，如：2021
			yy: date.getFullYear().substring(2), //2位年，如：21 
			M: date.getMonth() + 1, //月 : 如果1位的时候不补0
			MM: this.padStart(date.getMonth() + 1, 2, 0),
			d: date.getDate(), // 日 : 如果1位的时候不补0
			dd: this.padStart(date.getDate(), 2, 0), // 日 : 如果1位的时候补0
			h: date.getHours(),
			hh: this.padStart(date.getHours(), 2, 0),
			m: date.getMinutes(),
			mm: this.padStart(date.getMinutes(), 2, 0),
			s: this.getSeconds(),
			ss: this.padStart(date.getSeconds(), 2, 0),
			W: weeks[date.getDay()]
		}
		format || (format = 'yyyy-MM-dd hh:mm:ss')
		return format.replace(/([a-z])(\1)*/ig, function(m) {
			return cfg[m]
		})
	},
	/**
	 * 时间比较
	 * @param 第一个时间
	 * @param 第二个时间
	 * @param 比较的单位： y 年,q  季度,m  月,d  日,w  周,h  小时,n  分钟,s  秒,ms  毫秒
	 * @returns {*}
	 */
	dateDiff: function(objDate1, objDate2, interval) {
		let d = objDate1
		let i = {}
		let t = d.getTime()
		let t2 = objDate2.getTime()
		i['y'] = objDate2.getFullYear() - d.getFullYear()
		i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4)
		i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth()
		i['ms'] = objDate2.getTime() - d.getTime()
		i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000))
		i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000)
		i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000)
		i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000)
		i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000)
		return i[interval]
	},
}
