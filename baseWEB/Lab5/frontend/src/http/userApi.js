import {$authHost, $host} from "./index"

export const registration = async (formData, is_admin) => {
    if (is_admin) {
        const {data} = await $authHost.post('register', formData)
        return data
    }
    const {data} = await $host.post('register', formData)
    return data
}

export const login = async (formData) => {
    const {data} = await $host.post('login', formData)
    return data.token
}

export const get_info = async (all = 0) => {
    const {data} = await $authHost.get('user?all=' + all)
    return data
}


export const updateUser = async (new_data) => {
    const user_id = new_data.Id
    delete new_data.Id
    const {data} = await $authHost.put('user?id=' + user_id, new_data)
    return data
}

export const deleteUser = async (id) => {
    const {data} = await $authHost.delete('user?id=' + id)
    return data
}

