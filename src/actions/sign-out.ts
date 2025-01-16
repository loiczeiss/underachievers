'use server'

import * as auth from '@/auth'
import paths from '@/paths'

export async function signOut(){
    return auth.signOut({
        redirectTo: paths.home(), // Replace `paths.home` with your desired redirect path
        redirect: true, // Enable the redirect after signing out
    })
}