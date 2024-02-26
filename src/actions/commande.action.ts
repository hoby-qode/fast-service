import { revalidatePath } from "next/cache";
import useAuth from "../hooks/useAuth";
import { getServerSession } from "next-auth/next"
import { getSession } from "next-auth/react";

export async function validateCommande(prevState: any, formData: FormData ) {
    // const data = JSON.stringify({
    //   data: formData.get('data'),
    // })
    const content = formData.get('data')?.split(',')
    const session = await getSession()    
    try {
      if (!session) throw Error('Could not get user');
      const query = `
        mutation MyMutation {
          createCommandes(input: {clientMutationId: "uniqueId", title: "${session?.user?.name}", content: "${content}"}) {
            commandes {
              title
            }
          }
        }`;
    
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`,
        {
          method: 'POST', // ou 'PUT' selon le besoin
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user.accessToken}` // Ajouter le jeton d'accès à l'en-tête Authorization
          },
          body: JSON.stringify({query})
        }
      );
    
      if (!response.ok) {
        throw new Error("La création de commande n'a pas pu être terminée");
      }
      return {
        message: "Success",
        status: response.status
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Error",
        status: 400
      };
    }
}

