function setRef(ref, value = null) {
    if (!ref) return

    if (typeof ref === 'function') {
        ref(value)
    } else {
        ref.current = value
    }
}

function mergeRef(refA, refB) {
    if (refA == null && refB == null) {
        return null
    }
    return (value) => {
        setRef(refA, value)
        setRef(refB, value)
    }
}

export default mergeRef
