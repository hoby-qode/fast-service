"use client"
import React, { useEffect, useState } from 'react';
import Content from './Content';
import { useShoppingCart } from '@/src/store/useCartStore';

const Cart = () => {
  const [data, setData] = useState(null);
  const { items, addItem, removeItem } = useShoppingCart();
  useEffect(() => {
    const fetchData = async (Ids: any) => {
      try {
        const query = `
        query QueryProductBySlug{
          products(where: {in: [${Ids}]} 
            last: 500) {
              nodes {
                  databaseId
                  title
                  slug
                  acf_product {
                      dateDeSortie
                      rating
                      acteurs {
                          actorname
                          name
                      }
                  }
                  featuredImage {
                      node {
                          sourceUrl
                      }
                  }
                  status
                  content
                  hqTags {
                      nodes {
                          name
                          slug
                      }
                  }
                  categoriesProduct {
                    nodes {
                      slug
                      prix {
                        prix
                      }
                    }
                  } 
              }
          }
        }`

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const {data} = await response.json();
        console.log(data);
        
        console.log(data)
        setData(data);
      } catch (error) {
        console.error('Une erreur est survenue :', error);
      }
    };

    if (items) {
      // const idsCart = JSON.parse(cart)
      let idsCart = [];
      // Utilisation de la méthode map pour extraire les IDs
      idsCart = items.map(function(element:any) {
          return element.id;
      });
      
      if (idsCart.length > 0) {
        fetchData(idsCart);
      }
    }    
  }, [items]);

  return (
    <div>
      <div className="container mw-100">
        {data && <Content products={data.products.nodes}/>}
      </div>
    </div>
  );
};

export default Cart;
