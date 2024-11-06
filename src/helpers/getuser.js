import { supabase } from "../supabase/client";

export const getUserName = async () => {

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error('Error al obtener el usuario:', userError.message);
        return null;
    }

    if (user) {

        const { data: profiles, error: profileError } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single();

        if (profileError) {
            console.error('Error al obtener el perfil del usuario:', profileError.message);
            return null;
        }

        return profiles.username;
    }

    return null;
};

export const getOwnerName = async (bucketId) => {
    // Obtener información del bucket
    const { data: bucketData, error: bucketError } = await supabase.storage.getBucket(bucketId);

    if (bucketError) {
        console.error('Error al obtener información del bucket:', bucketError.message);
        return null;
    }

    // Asumimos que el bucket tiene un campo `owner` con el ID del propietario
    const ownerId = bucketData.owner;

    if (!ownerId) {
        console.error('No se encontró el propietario del bucket.');
        return null;
    }

    // Obtener el nombre de usuario del propietario en la tabla `profiles`
    const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', ownerId)
        .single();

    if (profileError) {
        console.error('Error al obtener el perfil del propietario del bucket:', profileError.message);
        return null;
    }

    return profileData.username;
};