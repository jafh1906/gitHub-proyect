import { supabase } from "../supabase/client";

export const signOut = async () => { //cerrar sesion

    const { error } = await supabase.auth.signOut();
    
    if (error) {
        console.error('Error al cerrar sesión:', error.message);
        return false;
    }
    
    return true;
};