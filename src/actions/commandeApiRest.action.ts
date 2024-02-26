import { getSession } from "next-auth/react";

export async function validateCommandeApiRest(prevState: any, formData: FormData ) {
  const session = await getSession()    

  if (!session) throw Error('Could not get user');

  const title = "#" + session?.user?.name ;
  const url = `${process.env.NEXT_PUBLIC_API_REST_ENDPOINT}/commande`;
  const data = {
    title: title,
    content: JSON.stringify(session?.user),
    status: 'publish',
    'acf': {
      produits: [50],
      ids_produits: "test"
    }
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN}`
      },
      body: JSON.stringify(data)
    })
    if(response.ok) {
      const responseData = await response.json();
      const commandeId = responseData.id;
      const updateTitle = "#" + session?.user?.name + " (n°"+ commandeId +")";
      await updateCommandeTitle(commandeId, updateTitle);
      return responseData;
    } else {
      console.error('error')
      return  null
    }
  } catch(err) {
    console.log(err)
    return null
  }
}

const updateCommandeTitle = async (commandeId, updateTitle) => {
  const url = `${process.env.NEXT_PUBLIC_API_REST_ENDPOINT}/commande/${commandeId}`;
  const data = {title: updateTitle};
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN}`
      },
      body: JSON.stringify(data)
    })

    if(!response.ok) {
      console.error('Erreur')
    }
  } catch (error) {
    console.error('Erreur')
  }
}