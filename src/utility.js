import { differenceInSeconds } from 'date-fns'

export const convertHexToRGB = (hex) => {
    // check if it's a rgba
    if (hex.match('rgba')) {
        let triplet = hex.slice(5).split(',').slice(0, -1).join(',')
        return triplet
    }

    let c
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')

        return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')
    }
}

export function debounce(func, wait, immediate) {
    let timeout
    return function () {
        const context = this,
            args = arguments
        clearTimeout(timeout)
        timeout = setTimeout(function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }, wait)
        if (immediate && !timeout) func.apply(context, args)
    }
}

export function isMobile() {
    if (window) {
        return window.matchMedia(`(max-width: 767px)`).matches
    }
    return false
}

export function isMdScreen() {
    if (window) {
        return window.matchMedia(`(max-width: 1199px)`).matches
    }
    return false
}

function currentYPosition(elm) {
    if (!window && !elm) {
        return
    }
    if (elm) return elm.scrollTop
    // Firefox, Chrome, Opera, Safari
    if (window.pageYOffset) return window.pageYOffset
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop
    return 0
}

function elmYPosition(elm) {
    let y = elm.offsetTop
    let node = elm
    while (node.offsetParent && node.offsetParent !== document.body) {
        node = node.offsetParent
        y += node.offsetTop
    }
    return y
}

export function scrollTo(scrollableElement, elmID) {
    const elm = document.getElementById(elmID)

    if (!elmID || !elm) {
        return
    }

    const startY = currentYPosition(scrollableElement)
    const stopY = elmYPosition(elm)

    let distance = stopY > startY ? stopY - startY : startY - stopY
    if (distance < 100) {
        scrollTo(0, stopY)
        return
    }
    const speed = Math.round(distance / 50)
    if (speed >= 20) speed = 20
    const step = Math.round(distance / 25)
    const leapY = stopY > startY ? startY + step : startY - step
    let timer = 0
    if (stopY > startY) {
        for (let i = startY; i < stopY; i += step) {
            setTimeout(
                (function (leapY) {
                    return () => {
                        scrollableElement.scrollTo(0, leapY)
                    }
                })(leapY),
                timer * speed
            )
            leapY += step
            if (leapY > stopY) leapY = stopY
            timer++
        }
        return
    }
    for (let i = startY; i > stopY; i -= step) {
        setTimeout(
            (function (leapY) {
                return () => {
                    scrollableElement.scrollTo(0, leapY)
                }
            })(leapY),
            timer * speed
        )
        leapY -= step
        if (leapY < stopY) leapY = stopY
        timer++
    }
    return false
}

export function getTimeDifference(date) {
    let difference = differenceInSeconds(new Date(), date)

    if (difference < 60) return `${Math.floor(difference)} sec`
    else if (difference < 3600) return `${Math.floor(difference / 60)} min`
    else if (difference < 86400) return `${Math.floor(difference / 3660)} h`
    else if (difference < 86400 * 30)
        return `${Math.floor(difference / 86400)} d`
    else if (difference < 86400 * 30 * 12)
        return `${Math.floor(difference / 86400 / 30)} mon`
    else return `${(difference / 86400 / 30 / 12).toFixed(1)} y`
}

export function generateRandomId() {
    const tempId = Math.random().toString()
    const uid = tempId.substring(2, tempId.length)
    return uid
}

export function getQueryParam(prop) {
    const params = {}
    const search = decodeURIComponent(
        window.location.href.slice(window.location.href.indexOf('?') + 1)
    )
    const definitions = search.split('&')
    definitions.forEach(function (val, key) {
        const parts = val.split('=', 2)
        params[parts[0]] = parts[1]
    })
    return prop && prop in params ? params[prop] : params
}

export function classList(classes) {
    return Object.entries(classes)
        .filter((entry) => entry[1])
        .map((entry) => entry[0])
        .join(' ')
}
