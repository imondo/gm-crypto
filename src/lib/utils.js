import { Buffer } from '../../node_modules/buffer'

// 32 位整数无符号循环左移
export const leftShift = (a, n) => {
  n = n % 32
  return (a << n) | (a >>> (32 - n))
}

// 补全 16 进制字符串
export const leftPad = (str, num) => {
  const padding = num - str.length
  return (padding > 0 ? '0'.repeat(padding) : '') + str
}

export const toArrayBuffer = (buf) => {
	// If the buffer is backed by a Uint8Array, a faster version will work
	if (buf instanceof Uint8Array) {
		// If the buffer isn't a subarray, return the underlying ArrayBuffer
		if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
			return buf.buffer
		} else if (typeof buf.buffer.slice === 'function') {
			// Otherwise we need to get a proper copy
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
		}
	}

	if (Buffer.isBuffer(buf)) {
		// This is the slow version that will work with any Buffer
		// implementation (even in old browsers)
		var arrayCopy = new Uint8Array(buf.length)
		var len = buf.length
		for (var i = 0; i < len; i++) {
			arrayCopy[i] = buf[i]
		}
		return arrayCopy.buffer
	} else {
		throw new Error('Argument must be a Buffer')
	}
}
