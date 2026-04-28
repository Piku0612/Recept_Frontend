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
  })

  const data = await res.json()

  if (!res.ok) {
    return { error: data?.error || "Sikertelen regisztráció" }
  }

  return data
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
  })

  const data = await res.json()

  if (!res.ok) {
    return { error: data?.error || "Sikertelen bejelentkezés" }
  }

  return data
}

// WhoAmI
export async function whoAmI() {
  const res = await fetch(`${BACKEND_URL}/whoami`, {
    method: 'GET',
    credentials: 'include'
  })

  if (!res.ok) {
    const data = await res.json()
    return { error: data?.error }
  }

  return await res.json()
}

// Logout
export async function Logout() {
  const res = await fetch(`${BACKEND_URL}/logout`, {
    method: 'POST',
    credentials: 'include'
  })

  if (!res.ok) {
    const data = await res.json()
    return { error: data?.error }
  }

  return await res.json()
}

// Receptek listázása
export async function List() {
  const res = await fetch(`${BACKEND_URL_RECIPE}/list`, {
    method: 'GET',
    credentials: 'include'
  })
  console.log(res);
  if (!res.ok) {
    const data = await res.json()
    return { error: data?.error }
  }

  return await res.json()
}

// Receptek keresése
export async function searchRecipes(search) {
  const res = await fetch(
    `${BACKEND_URL_RECIPE}/search?search=${encodeURIComponent(search)}`,
    {
      method: 'GET',
      credentials: 'include'
    }
  )
  console.log(res);
  if (!res.ok) {
    const data = await res.json()
    return { error: data?.error }
  }
  
  return await res.json()
}

// Kedvencek listája
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

// Kedvenchez adás
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

// Kedvenc törlése
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

// Összes user lekérése adminnak
export async function getAllUsers() {
  const res = await fetch(`${BACKEND_URL}/allusers`, {
    method: 'GET',
    credentials: 'include'
  })

  if (!res.ok) {
    const data = await res.json()
    return { error: data?.error || 'Felhasználók lekérési hiba' }
  }

  return await res.json()
}

// User szerkesztés adminnak
export async function userEdit(user_id, username, email, role) {
  const res = await fetch(`${BACKEND_URL}/edit/${user_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ username, email, role })
  })

  if (!res.ok) {
    const data = await res.json()
    return { error: data?.error || 'Felhasználó módosítási hiba' }
  }

  return await res.json()
}

// User törlés adminnak
export async function deleteUser(user_id) {
  const res = await fetch(`${BACKEND_URL}/delete/${user_id}`, {
    method: 'DELETE',
    credentials: 'include'
  })

  if (!res.ok) {
    const data = await res.json()
    return { error: data?.error || 'Felhasználó törlési hiba' }
  }

  return await res.json()
}

export function getImageUrl(imageUrl) {
  if (!imageUrl) {
    return "https://via.placeholder.com/900x500?text=No+Image";
  }

  const fixedPath = String(imageUrl).replaceAll("\\", "/");

  if (fixedPath.startsWith("http")) {
    return fixedPath;
  }

  return fixedPath;
}

export async function getRecipeById(recipeId) {
  const recipes = await List();

  if (recipes.error) {
    return recipes;
  }

  const recipe = recipes.find((r) => String(r.recipe_id) === String(recipeId));

  if (!recipe) {
    return { error: "Recept nem található" };
  }

  return recipe;
}

export async function getTopRecipes() {
  const recipes = await List();

  if (recipes.error) {
    return recipes;
  }

  return recipes.sort(
    (a, b) => Number(b.szivekSzama || 0) - Number(a.szivekSzama || 0)
  );
}