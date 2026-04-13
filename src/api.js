const BACKEND_URL = '/users'
const BACKEND_URL_RECIPE = '/recipe'
const BACKEND_URL_FAV = '/fav'

// Regisztráció
export async function register(username, password, email) {
    const res = await fetch(`${BACKEND_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password, email }),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      return { error: data?.error || "Sikertelen regisztráció" };
    }
  
    return data;
  }

// Bejelentkezés
export async function login(email, password) {
    const res = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      return { error: data?.error || "Sikertelen bejelentkezés" };
    }
  
    return data;
  }

//WhoAmI
export async function whoAmI(){
    const res=await fetch(`${BACKEND_URL}/whoami`,{
        method:'GET',
        credentials:'include'
    })

    //console.log(res);
    if (!res.ok) {
        const data=await res.json()
        return{error:data?.error}
    }

    return await res.json()
}

//Logout
export async function Logout(){
    const res=await fetch(`${BACKEND_URL}/logout`,{
        method:'POST',
        credentials:'include'
    })

    console.log(res);
    if (!res.ok) {
        const data=await res.json()
        return{error:data?.error}
    }

    return await res.json()
}

//List
export async function List(){
    const res=await fetch(`${BACKEND_URL_RECIPE}/list`,{
        method:'GET',
        credentials:'include'
    })

    //console.log(res);
    if (!res.ok) {
        const data=await res.json()
        return{error:data?.error}
    }

    return await res.json()
}

//FavList
export async function listFavourites() {
    const res = await fetch(`${BACKEND_URL_FAV}/`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

//AddFav
export async function addFavourite(recipeId) {
    const res = await fetch(`${BACKEND_URL_FAV}/${recipeId}`, {
        method: 'POST',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

//RemoveAdd
export async function removeFavourite(recipeId) {
    const res = await fetch(`${BACKEND_URL_FAV}/delete/${recipeId}`, {
        method: 'DELETE',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

async function parseResponse(res) {
    const contentType = res.headers.get("content-type") || ""

    if (contentType.includes("application/json")) {
        return await res.json()
    }

    const text = await res.text()
    return text ? { message: text } : {}
}

async function requestWithFallback(configs, body) {
    let lastError = "Request failed"

    for (const config of configs) {
        try {
            const res = await fetch(config.url, {
                method: config.method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: body === undefined ? undefined : JSON.stringify(body),
            })

            const data = await parseResponse(res)

            if (res.ok) {
                return data
            }

            lastError = data?.error || data?.message || `${config.method} ${config.url} failed`
        } catch (error) {
            lastError = error.message || lastError
        }
    }

    return { error: lastError }
}

function createConfigs(methods, urls) {
    return methods.flatMap((method) => urls.map((url) => ({ method, url })))
}

export async function listAdminUsers() {
    return await requestWithFallback(
        createConfigs(["GET"], [
            "/users/admin/list",
            "/users/admin/users",
            "/admin/users",
            "/users/list",
        ])
    )
}

export async function updateAdminUser(userId, payload) {
    return await requestWithFallback(
        createConfigs(["PUT", "PATCH"], [
            `/users/admin/${userId}`,
            `/users/admin/users/${userId}`,
            `/admin/users/${userId}`,
            `/users/${userId}`,
        ]),
        payload
    )
}

export async function deleteAdminUser(userId) {
    return await requestWithFallback(
        createConfigs(["DELETE"], [
            `/users/admin/${userId}`,
            `/users/admin/users/${userId}`,
            `/admin/users/${userId}`,
            `/users/${userId}`,
        ])
    )
}

export async function listAdminRecipes() {
    return await requestWithFallback(
        createConfigs(["GET"], [
            "/recipe/admin/list",
            "/recipe/admin/recipes",
            "/admin/recipes",
            "/recipe/list",
        ])
    )
}

export async function updateAdminRecipe(recipeId, payload) {
    return await requestWithFallback(
        createConfigs(["PUT", "PATCH"], [
            `/recipe/admin/${recipeId}`,
            `/recipe/admin/recipes/${recipeId}`,
            `/admin/recipes/${recipeId}`,
            `/recipe/${recipeId}`,
        ]),
        payload
    )
}

export async function deleteAdminRecipe(recipeId) {
    return await requestWithFallback(
        createConfigs(["DELETE"], [
            `/recipe/admin/${recipeId}`,
            `/recipe/admin/recipes/${recipeId}`,
            `/admin/recipes/${recipeId}`,
            `/recipe/${recipeId}`,
        ])
    )
}

export async function listAdminEmails() {
    return await requestWithFallback(
        createConfigs(["GET"], [
            "/users/admin/emails",
            "/admin/emails",
            "/emails",
            "/email",
        ])
    )
}

export async function updateAdminEmail(emailId, payload) {
    return await requestWithFallback(
        createConfigs(["PUT", "PATCH"], [
            `/users/admin/emails/${emailId}`,
            `/admin/emails/${emailId}`,
            `/emails/${emailId}`,
            `/email/${emailId}`,
        ]),
        payload
    )
}

export async function deleteAdminEmail(emailId) {
    return await requestWithFallback(
        createConfigs(["DELETE"], [
            `/users/admin/emails/${emailId}`,
            `/admin/emails/${emailId}`,
            `/emails/${emailId}`,
            `/email/${emailId}`,
        ])
    )
}
