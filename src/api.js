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