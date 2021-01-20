import React, { RefObject, useEffect } from 'react'

export const useOutsideClick = (ref: RefObject<HTMLDivElement | undefined>, callback: () => void) => {
    function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as any)) {
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return function cleanup() {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
}
