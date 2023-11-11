import {createCookieSessionStorage, type Session} from '@remix-run/node'

export type ToastMessage = {
    message: string
    type: 'success' | 'error'
    hideAfter: number
}

export const ONE_YEAR = 1000 * 60 * 60 * 24 * 365

export const {commitSession, getSession} = createCookieSessionStorage({
    cookie: {
        name: '__message',
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secrets: ['umsys-messages'],
        secure: true,
    },
})

export function setSuccessMessage(
    session: Session,
    message: string,
    hideAfter: number = 5000,
) {
    session.flash('toastMessage', {
        message,
        type: 'success',
        hideAfter,
        expires: Date.now() + ONE_YEAR,
    } as ToastMessage)
}

export function setErrorMessage(
    session: Session,
    message: string,
    hideAfter: number = 7000,
) {
    session.flash('toastMessage', {
        message,
        type: 'error',
        hideAfter,
        expires: Date.now() + ONE_YEAR,
    } as ToastMessage)
}
